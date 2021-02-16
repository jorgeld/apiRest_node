'use strict';

const Equipo = require('../modelos/equipos');
const Jugador = require('../modelos/jugadores');
const moment = require('moment');
const async = require('async');
// const async = require('async/concatSeries');
const constantes = require('../constantes');
const multer = require('multer');

const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require('express')
const app = express();


//Devuelve listado con todos los equipos
function getEquipos(req, res){
    Equipo.find({},function(err,equipos){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!equipos)return res.status(404).send({message:`No existen equipos`});

        res.status(200).send({equipos})
    })
}

//Devuelve un equipo a través de su equipoId
function getEquipo(req, res){
    let equipoId = req.params.equipoId;
    Equipo.findById(equipoId,function(err,equipo){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!equipo)return res.status(404).send({message:`El equipo no existe`});
        res.status(200).send({equipo})
    })
}

//Devuelve un array con los jugadores pertenecientes a un equipo.
function getEquipoPlayers(req, res){
    let equipoId = req.params.equipoId;
    Equipo.findById(equipoId,function(err,equipo){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!equipo)return res.status(404).send({message:`El equipo no existe`});
        res.status(200).send({jugadores : equipo['jugadores']})
    })
}

// Creación de nuevo equipo
function newEquipo(req , res){
    let equipo = new Equipo();

    equipo.name = req.body.name;
    equipo.bandera = req.body.bandera;
    equipo.escudo = req.body.escudo;
    equipo.jugadores = [];
    equipo.palmares = null;
    equipo.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');

    equipo.save(function (err, equipoStored) {
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })

        }
        console.log(`--- NEW EQUIPO--- ${new moment()} --->`);
        res.status(200).send({equipo: equipoStored})
    })
}

function guardarDraft(req,res){

    //Recorremos equipos
    async.map(req.body,(equipo)=>{
        console.log('Equipo -> ',equipo.name);
        //Recorremos jugadores del equipo
        async.map(equipo.jugadores,(jugador)=>{
            var jugadorToUpdate = {};
                jugadorToUpdate = Object.assign(jugadorToUpdate, jugador);
                //Borramos propiedad _id del jugador ?¿?¿WHY?¿¿
                delete jugadorToUpdate._id;
                //Actualizamos cambios en jugador
                Jugador.findOneAndUpdate(jugador.jugadorId,jugadorToUpdate,function(err,jugadorUpdate){
                    if(err){
                        console.log('error ------>' , err)
                    }else{
                        console.log('Jugador modificado')
                    }
                });
        });

        // var equipoToUpdate = {};
        // equipoToUpdate = Object.assign(equipoToUpdate, equipo);
        // delete equipoToUpdate.equipoId;
        // Equipo.findOneAndUpdate(equipo.equipoId,equipoToUpdate,function(err,equipoUpdate){
        //     if(err){
        //         console.log(err);
        //         // res.status(500).send({message : `Error al editar equipo`});
        //         res.status(400).send({message : `Error al editar equipo`})
        //     }else{
        //         console.log(`--- UPDATE EQUIPO --- ${new moment()} --- ${equipo.name} --- ${equipo.equipoId}`);
        //     }
        // });
    });
    res.status(200).send('Draft generado correctamente.')

    //
    //
    //
    //
    //
    // console.log('Cuerpo de la llamada -----> ', req.body);
    // // Actualizamos la información del equipo
    // req.body.forEach(function(equipo){
    //     // Actualizamos la información del jugador
    //     equipo.jugadores.forEach(function(jugador){
    //
    //
    //         var jugadorToUpdate = {};
    //         jugadorToUpdate = Object.assign(jugadorToUpdate, jugador);
    //         delete jugadorToUpdate._id;
    //
    //         Jugador.findOneAndUpdate(jugador.jugadorId,jugadorToUpdate,function(err,jugadorUpdate){
    //             if(err){
    //                 console.log('error ------>' , err)
    //                 // res.status(400).send({message : `Error al editar jugador`})
    //             }else{
    //                 console.log('Jugador modificado')
    //             }
    //         });
    //     });
    //
    //     var equipoToUpdate = {};
    //     equipoToUpdate = Object.assign(equipoToUpdate, equipo);
    //     delete equipoToUpdate.equipoId;
    //     Equipo.findOneAndUpdate(equipo.equipoId,equipoToUpdate,function(err,equipoUpdate){
    //         if(err){
    //             console.log(err);
    //             // res.status(500).send({message : `Error al editar equipo`});
    //             res.status(400).send({message : `Error al editar equipo`})
    //         }else{
    //              console.log(`--- UPDATE EQUIPO --- ${new moment()} --- ${equipo.name} --- ${equipo.equipoId}`);
    //         }
    //     });
    // });
    //
    // console.log('Cuerpo de la llamada -----> ', req.body);
}

// Actualización de equipo
function updateEquipo(req,res){

    let equipoId = req.params.equipoId;
    let update = req.body;
    let options = {};


    console.log('BODY ---> ' , req.body)

    Equipo.findByIdAndUpdate(equipoId,update,options,function(err,equipoUpdate){
        // equipoUpdate.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');
        if(err){
            res.status(500).send({message : `Error al editar equipo`});
            res.status(400).send({message : `Error al editar equipo`});
        }else{
            console.log(`--- UPDATE JUGADOR--- ${new moment()} --->`);
            res.status(200).send({equipo : equipoUpdate})
        }
        console.log(`--- UPDATE EQUIPO--- ${new moment()} --->`);
    });
    //res.status(200).send({message : `jugadores modificados`})


}

//Borrado de un equipo especifico
function deleteEquipo(req, res){
    let equipoId = req.params.equipoId;

    Equipo.findById(equipoId,function(err,monkey){
        if(err)return res.status(500).send({message:`Error al borrar equipo`});

        monkey.remove(function(err){
            if(err){
                res.status(500).send({message : `Error al borrar equipo`});
            }
            console.log(`--- DELETE EQUIPO--- ${new moment()} --->`);
            res.status(200).send({message : `El equipo ha sido eliminado`})
        })

    })
}

//Generamos listado de equipos
function generarEquipos(req, res){

    console.log(`Llamando a generarEquipos()`);

    var equipos = constantes.equipos;

    Equipo.insertMany(equipos,function(err,docs){
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
        }
        console.log(` **** Generados nuevos equipos--- ${new moment()} --->`);
        res.status(200).send({message : 'Equipos generados correctamente correctamente'})
    });
}

//Borramos todos los equipos
function deleteAllEquipos(req, res){

    // El objeto vacio recoge todos los elementos de la colección
    Equipo.remove({},function(err,docs){
        if(!err){
            console.log(` **** Eliminando todos los Equipos ----> ${new moment()}`);
            res.status(200).send({message : 'Equipo borrados correctamente'})
        }else{
            res.status(500).send({error : 'Error al borrar equipos'})
        }
    });
}


function uploadImg(req, res){

    console.log(' ******* UPLOADING IMG ******* ' );

    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "./Images");
        },
        filename: function(req, file, callback) {
            callback(null, 'nombre_ejemplo');
        }
    });

    var upload = multer({
        storage: Storage
    });


    app.post('/profile', upload.single('file'), function (req, res, next) {


        console.log(' res ---> ' , res )
        console.log(' res ---> ' , res )
        console.log(' res ---> ' , res )

        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
    })


    // upload(req, res, function(err) {
    //
    //      console.log('uploading ... ', err)
    //
    //     if (err) {
    //         return res.end("Something went wrong!");
    //     }
    //     return res.end("File uploaded sucessfully!.");
    // });


}

module.exports = {
    getEquipos,
    getEquipo,
    getEquipoPlayers,
    newEquipo,
    updateEquipo,
    deleteEquipo,
    deleteAllEquipos,
    guardarDraft,
    generarEquipos,
    uploadImg
};