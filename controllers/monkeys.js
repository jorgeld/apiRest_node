'use strict';

const Monkey = require('../modelos/monkeys');
const moment = require('moment');

function getMonkeys(req, res){
    Monkey.find({},function(err,monkeys){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!monkeys)return res.status(404).send({message:`No existen usuarios`});
        console.log(`//////////////////////////`)
        console.log(`--- GET MONKEYS --- ${new moment()} --->`);
        monkeys.forEach(function(monkey){
            console.log(`--- ${monkey.name}∫`)
        });
        console.log(`//////////////////////////`)
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
    monkey.name = req.body.name;
    monkey.img = req.body.img;
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

    // let monkey = new Monkey();
    // monkey.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
    // monkey.lastModified = req.body.lasLogin;

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

module.exports = {
    getMonkeys,
    getMonkey,
    newMonkey,
    updateMonkey,
    deleteMonkey
};