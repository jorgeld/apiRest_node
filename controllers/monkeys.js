'use strict';

const Monkey = require('../modelos/monkeys');
const moment = require('moment');

function getMonkeys(req, res){
    Monkey.find({},function(err,monkeys){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!monkeys)return res.status(404).send({message:`No existen usuarios`});
        console.log(`**********************************************************************`);
        console.log(`** GET MONKEYS --- ${new moment()} --->`);
        monkeys.forEach(function(monkey){
            console.log(`** name:${monkey.name} -- id:${monkey._id} -- signupDate:${monkey.signupDate} -- lastModified:${monkey.lastModified}`)
        });
        console.log(`**********************************************************************`);
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

    let nombres = ['ANTONIO', 'JOSE', 'MANUEL', 'FRANCISCO', 'DAVID', 'JUAN', 'JOSE ANTONIO', 'JAVIER', 'JOSE LUIS', 'DANIEL', 'FRANCISCO JAVIER', 'JESUS', 'CARLOS', 'ALEJANDRO', 'MIGUEL', 'JOSE MANUEL', 'RAFAEL', 'PEDRO', 'MIGUEL ANGEL', 'ANGEL', 'JOSE MARIA', 'PABLO', 'FERNANDO', 'SERGIO', 'LUIS', 'JORGE', 'ALBERTO', 'JUAN CARLOS', 'JUAN JOSE', 'ALVARO', 'DIEGO', 'ADRIAN', 'RAUL', 'JUAN ANTONIO', 'ENRIQUE', 'IVAN', 'RAMON', 'RUBEN', 'VICENTE', 'OSCAR', 'ANDRES', 'JOAQUIN', 'JUAN MANUEL', 'SANTIAGO', 'EDUARDO', 'VICTOR', 'ROBERTO', 'MARIO', 'JAIME', 'FRANCISCO JOSE', 'IGNACIO', 'MARCOS', 'ALFONSO', 'SALVADOR', 'RICARDO', 'JORDI', 'EMILIO', 'GUILLERMO', 'JULIAN', 'GABRIEL', 'JULIO', 'HUGO','TOMAS','MARC', 'JOSE MIGUEL', 'AGUSTIN', 'GONZALO', 'MOHAMED', 'JOSE RAMON', 'FELIX', 'JOAN', 'NICOLAS', 'ISMAEL', 'CRISTIAN', 'MARTIN', 'SAMUEL', 'AITOR', 'JOSEP', 'JUAN FRANCISCO', 'MARIANO', 'DOMINGO', 'HECTOR', 'JOSE CARLOS', 'ALFREDO', 'SEBASTIAN', 'CESAR', 'IKER', 'FELIPE', 'JOSE ANGEL', 'JOSE IGNACIO', 'ALEX', 'VICTOR MANUEL', 'LUIS MIGUEL', 'RODRIGO', 'GREGORIO', 'JOSE FRANCISCO', 'JUAN LUIS', 'XAVIER', 'ALBERT', 'MARIA CARMEN', 'MARIA', 'CARMEN', 'JOSEFA', 'ANA MARIA', 'ISABEL', 'MARIA PILAR', 'MARIA DOLORES', 'MARIA TERESA','LAURA', 'ANA', 'CRISTINA','MARIA ANGELES', 'FRANCISCA', 'MARTA', 'ANTONIA','DOLORES', 'MARIA ISABEL',
        'MARIA JOSE', 'LUCIA', 'MARIA LUISA', 'SARA', 'PAULA','ELENA', 'PILAR', 'CONCEPCION', 'RAQUEL', 'ROSA MARIA', 'MANUELA', 'MERCEDES', 'MARIA JESUS', 'ROSARIO', 'JUANA', 'TERESA', 'BEATRIZ',
        'ENCARNACION', 'NURIA', 'JULIA', 'SILVIA', 'IRENE', 'MONTSERRAT', 'PATRICIA', 'ALBA', 'ROSA', 'ANDREA', 'ROCIO',
        'MONICA', 'MARIA MAR', 'ANGELA', 'ALICIA', 'SONIA', 'SANDRA', 'MARINA', 'SUSANA', 'MARGARITA', 'YOLANDA', 'NATALIA', 'MARIA JOSEFA', 'MARIA ROSARIO', 'INMACULADA', 'EVA', 'MARIA MERCEDES',
        'CLAUDIA', 'ANA ISABEL', 'ESTHER', 'NOELIA', 'ANGELES', 'VERONICA', 'CARLA', 'SOFIA', 'CAROLINA', 'NEREA',
        'MARIA ROSA', 'MARIA VICTORIA', 'AMPARO', 'EVA MARIA', 'MARIA CONCEPCION', 'LORENA', 'MIRIAM', 'INES', 'ANA BELEN', 'VICTORIA',
        'MARIA ELENA', 'MARIA ANTONIA', 'CATALINA', 'CONSUELO', 'LIDIA', 'MARIA NIEVES', 'DANIELA', 'CELIA',
        'EMILIA', 'LUISA', 'GLORIA', 'OLGA', 'ALEJANDRA', 'AURORA', 'MARIA SOLEDAD', 'ESPERANZA', 'AINHOA','MARIA CRISTINA'];

    let apellidos = ['GARCIA',
        'GONZALEZ',
        'RODRIGUEZ',
        'FERNANDEZ',
        'LOPEZ',
        'MARTINEZ',
        'SANCHEZ',
        'PEREZ',
        'GOMEZ',
        'MARTIN',
        'JIMENEZ',
        'RUIZ',
        'HERNANDEZ',
        'DIAZ',
        'MORENO',
        'MUÑOZ',
        'ALVAREZ',
        'ROMERO',
        'ALONSO',
        'GUTIERREZ',
        'NAVARRO',
        'TORRES',
        'DOMINGUEZ',
        'VAZQUEZ',
        'RAMOS',
        'GIL',
        'RAMIREZ',
        'SERRANO',
        'BLANCO',
        'MOLINA',
        'MORALES',
        'SUAREZ',
        'ORTEGA',
        'DELGADO',
        'CASTRO',
        'ORTIZ',
        'RUBIO',
        'MARIN',
        'SANZ',
        'NUÑEZ',
        'IGLESIAS',
        'MEDINA',
        'GARRIDO',
        'CORTES',
        'CASTILLO',
        'SANTOS',
        'LOZANO',
        'GUERRERO',
        'CANO',
        'PRIETO',
        'MENDEZ',
        'CRUZ',
        'CALVO',
        'GALLEGO',
        'VIDAL',
        'LEON',
        'MARQUEZ',
        'HERRERA',
        'PEÑA',
        'FLORES',
        'CABRERA',
        'CAMPOS',
        'VEGA',
        'FUENTES',
        'CARRASCO',
        'DIEZ',
        'CABALLERO',
        'REYES',
        'NIETO',
        'AGUILAR',
        'PASCUAL',
        'SANTANA',
        'HERRERO',
        'LORENZO',
        'MONTERO',
        'HIDALGO',
        'GIMENEZ',
        'IBAÑEZ',
        'FERRER',
        'DURAN',
        'SANTIAGO',
        'BENITEZ',
        'MORA',
        'VICENTE',
        'VARGAS',
        'ARIAS',
        'CARMONA',
        'CRESPO',
        'ROMAN',
        'PASTOR',
        'SOTO',
        'SAEZ',
        'VELASCO',
        'MOYA',
        'SOLER',
        'PARRA',
        'ESTEBAN',
        'BRAVO',
        'GALLARDO',
        'ROJAS'];

    var aleatorioNombre = Math.floor((Math.random() * nombres.length) + 1);
    var aleatorioApellido = Math.floor((Math.random() * apellidos.length) + 1);
    monkey.name = `${nombres[aleatorioNombre]} ${apellidos[aleatorioApellido]}`;
    monkey.sexo = (aleatorioNombre > 99)? monkey.sexo = 'HEMBRA': monkey.sexo = 'MACHO';
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