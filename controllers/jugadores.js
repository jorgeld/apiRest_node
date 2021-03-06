'use strict';

const Jugador = require('../modelos/jugadores');
const moment = require('moment');
const constantes = require('../constantes');

function getJugadores(req, res){
    Jugador.find({},function(err,jugadores){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!jugadores)return res.status(404).send({message:`No existen usuarios`});
        console.log(` **** Recogiendo listado jugadores ${new moment()}`);
        res.status(200).send({jugadores})
    })
}

function getJugador(req, res){
    let jugadorId = req.params.jugadorId;
    Jugador.findById(jugadorId,function(err,jugador){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!jugador)return res.status(404).send({message:`El jugador no existe`});
        res.status(200).send({jugador})
    })
}

function newJugador(req , res){
    let jugador = new Jugador();

    var aleatorioNombre = Math.floor((Math.random() * constantes.nombreshombre.length -1) + 1);
    var aleatorioApellido = Math.floor((Math.random() * constantes.apellidos.length -1) + 1);
    var aleatorioProvincia = Math.floor((Math.random() * constantes.provincias.length -1) + 1);

    jugador.name = `${constantes.nombreshombre[aleatorioNombre]} ${constantes.apellidos[aleatorioApellido]}`;
    jugador.lugar = constantes.provincias[aleatorioProvincia].toUpperCase();
    jugador.edad = Math.floor((Math.random() * (22 - 18) + 18));
    jugador.atributos = {
        ataque : Math.floor((Math.random() * (99 - 10) + 10)),
        defensa : Math.floor((Math.random() * (99 - 10) + 10)),
        rebotes : Math.floor((Math.random() * (99 - 10) + 10)),
        pase : Math.floor((Math.random() * (99 - 10) + 10)),
        agresividad : Math.floor((Math.random() * (99 - 10) + 10)),
        sexualidad : Math.floor((Math.random() * (99 - 10) + 10)),
    };
    (req.body.puesto)?jugador.posicion = req.body.puesto:jugador.posicion = `${constantes.posiciones[Math.floor((Math.random() * constantes.posiciones.length -1) + 1)]}`;
    jugador.img = req.body.img;
    jugador.team = '';
    jugador.galardones = null;
    jugador.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
    jugador.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');

    jugador.save(function (err, jugadorStored) {
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
        }
        console.log(`**** NEW JUGADOR--- ${new moment()} --->`);
        res.status(200).send({jugador: jugadorStored})
    })
}

function generarHornada(req,res){

    var posiciones = ['PIVOT','ALA-PIVOT','ALERO','ESCOLTA','BASE'];
    var jugadores = [];

    //Generamos array de jugadores por crear
    for(var i = 0; i < posiciones.length; i++){

        for(var j = 0; j< 40; j++){
            let jugador = new Jugador();
            var aleatorioNombre = Math.floor((Math.random() * constantes.nombreshombre.length -1) + 1);
            var aleatorioApellido = Math.floor((Math.random() * constantes.apellidos.length -1) + 1);
            var aleatorioProvincia = Math.floor((Math.random() * constantes.provincias.length -1) + 1);

            jugador.name = `${constantes.nombreshombre[aleatorioNombre]} ${constantes.apellidos[aleatorioApellido]}`;
            jugador.lugar = constantes.provincias[aleatorioProvincia].toUpperCase();
            jugador.edad = Math.floor((Math.random() * (22 - 18) + 18));
            jugador.atributos = {
                ataque : Math.floor((Math.random() * (99 - 10) + 10)),
                defensa : Math.floor((Math.random() * (99 - 10) + 10)),
                rebotes : Math.floor((Math.random() * (99 - 10) + 10)),
                pase : Math.floor((Math.random() * (99 - 10) + 10)),
                agresividad : Math.floor((Math.random() * (99 - 10) + 10)),
                sexualidad : Math.floor((Math.random() * (99 - 10) + 10)),
            };
            jugador.posicion = posiciones[i];
            jugador.img = '';
            jugador.team = '';
            jugador.galardones = null;
            jugador.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
            jugador.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');
            jugadores.push(jugador);
        }
    }

    Jugador.insertMany(jugadores,function(err,docs){
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
        }
        console.log(` **** Nueva hornada --- ${new moment()} --->`);
        res.status(200).send({message : 'Hornada generado correctamente'})
    });

}

function updateJugador(req,res){
    let jugadorId = req.params.jugadorId;
    let update = req.body;
    let options = {};

    console.log(`UPDATE JUGADOR --> ID --> ${jugadorId}`);
    console.log(`UPDATE JUGADOR --> BODY -->`, req.body);

    Jugador.findOneAndUpdate(jugadorId,update,function(err,jugadorUpdate){
        jugadorUpdate.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');
        if(err){
            res.status(500).send({message : `Error al editar jugador`});
            res.status(400).send({message : `Error al editar jugador`});
        }else{
            console.log(`--- UPDATE JUGADOR--- ${new moment()} --->`);
            res.status(200).send({jugador : jugadorUpdate})
        }

    })

}

function deleteJugador(req, res){
    let jugadorId = req.params.jugadorId;

    Jugador.findById(jugadorId,function(err,monkey){
        if(err)return res.status(500).send({message:`Error al borrar jugador`});

        monkey.remove(function(err){
            if(err){
                res.status(500).send({message : `Error al borrar jugador`});
            }
            console.log(`--- DELETE JUGADOR--- ${new moment()} --->`);
            res.status(200).send({message : `El jugador ha sido eliminado`})
        })

    })
}

function deleteAllJugadores(req, res){

    // El objeto vacio recoge todos los elementos de la colección
    Jugador.remove({},function(err,docs){
        if(!err){
            console.log(` **** Eliminando todos los jugadores ----> ${new moment()}`);
            res.status(200).send({message : 'Jugadores borrados correctamente'})
        }else{
            res.status(500).send({error : 'Error al borrar jugadores'})
        }
    });
}


module.exports = {
    getJugador,
    getJugadores,
    newJugador,
    generarHornada,
    updateJugador,
    deleteJugador,
    deleteAllJugadores
};