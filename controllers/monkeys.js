'use strict';

const Monkey = require('../modelos/monkeys');
const moment = require('moment');
const constantes = require('../constantes');

function getMonkeys(req, res){
    Monkey.find({},function(err,monkeys){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!monkeys)return res.status(404).send({message:`No existen usuarios`});
        console.log(`** GET MONKEYS --- ${new moment()} ------------------------------------->`);
        monkeys.forEach(function(monkey){console.log(`** name:${monkey.name} -- bananas:${monkey.bananas} -- id:${monkey._id} -- signupDate:${monkey.signupDate} -- lastModified:${monkey.lastModified}`)});

        res.status(200).send({monkeys})
    })
}

function getMonkey(req, res){
    let monkeyId = req.params.monkeyId;
    Monkey.findById(monkeyId,function(err,monkey){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!monkey)return res.status(404).send({message:`El monkey no existe`});
        console.log(`--- GET MONKEY--- ${new moment()} --->`);
        res.status(200).send({monkey})
    })
}

function newMonkey(req , res){
    let monkey = new Monkey();

    var aleatorioNombre = Math.floor((Math.random() * constantes.nombres.length) + 1);
    var aleatorioApellido = Math.floor((Math.random() * constantes.apellidos.length) + 1);
    var aleatorioPaises = Math.floor((Math.random() * constantes.paises.length) + 1);

    monkey.name = `${constantes.nombres[aleatorioNombre]} ${constantes.apellidos[aleatorioApellido]}`;
    monkey.sexo = (aleatorioNombre > 99)? monkey.sexo = 'HEMBRA': monkey.sexo = 'MACHO';
    monkey.pais = constantes.paises[aleatorioPaises].toUpperCase();
    monkey.img = req.body.img;
    monkey.bananas = 0;
    monkey.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
    monkey.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');

    monkey.save(function (err, monkeyStored) {
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
        }
        console.log(`--- NEW MONKEY--- ${new moment()} --->`);
        res.status(200).send({monkey: monkeyStored})
    })
}

function updateMonkey(req,res){

    let monkeyId = req.params.monkeyId;
    let update = req.body;
    let options = {};

    Monkey.findByIdAndUpdate(monkeyId,update,options,function(err,monkeyUpdate){
        monkeyUpdate.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');
        if(err){
            res.status(500).send({message : `Error al editar el monkey`});
        }
        console.log(`--- UPDATE MONKEY--- ${new moment()} --->`);
        res.status(200).send({monkey : monkeyUpdate})
    })

}

function deleteMonkey(req, res){
    let monkeyId = req.params.monkeyId;

    Monkey.findById(monkeyId,function(err,monkey){
        if(err)return res.status(500).send({message:`Error al borrar monkey`});

        monkey.remove(function(err){
            if(err){
                res.status(500).send({message : `Error al borrar el monkey`});
            }
            console.log(`--- DELETE MONKEY--- ${new moment()} --->`);
            res.status(200).send({message : `El monkey ha sido eliminado`})
        })

    })
}

function putBanana(req, res){

    Monkey.findById(req.params.monkeyId,function(err,monkey){

        if(err)return res.status(500).send({message:`Error al borrar monkey`});

        let b  = monkey.bananas + 1;

        monkey.update({bananas : b},function(err){
            if(err){
                res.status(500).send({message : `Error al editar el monkey`});
            }
            res.status(200).send({monkey : monkey})
        })
    })
}


module.exports = {
    getMonkeys,
    getMonkey,
    newMonkey,
    updateMonkey,
    deleteMonkey,
    putBanana
};