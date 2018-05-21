'use strict';

const Equipo = require('../modelos/equipos');
const Jugador = require('../modelos/jugadores');
const moment = require('moment');
const async = require('async');
// const async = require('async/concatSeries');
const constantes = require('../constantes');

function getEquipos(req, res){
    Equipo.find({},function(err,equipos){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!equipos)return res.status(404).send({message:`No existen equipos`});

        res.status(200).send({equipos})
    })
}

function getEquipo(req, res){
    let equipoId = req.params.equipoId;
    Equipo.findById(equipoId,function(err,equipo){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!equipo)return res.status(404).send({message:`El equipo no existe`});
        res.status(200).send({equipo})
    })
}

function newEquipo(req , res){
    let equipo = new Equipo();

    equipo.name = req.body.name;
    equipo.bandera = req.body.bandera;
    equipo.escudo = req.body.escudo;
    equipo.jugadores = [];
    equipo.palmares = null;
    equipo.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
    equipo.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');

    equipo.save(function (err, equipoStored) {
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
        }
        console.log(`--- NEW EQUIPO--- ${new moment()} --->`);
        res.status(200).send({equipo: equipoStored})
    })
}

function guardarDraft(req,res){



    async.map(req.body,(equipo)=>{
        console.log('Equipo -> ',equipo.name);
        async.map(equipo.jugadores,(jugador)=>{
            var jugadorToUpdate = {};
                jugadorToUpdate = Object.assign(jugadorToUpdate, jugador);
                delete jugadorToUpdate._id;
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

function updateEquipo(req,res){

    let equipoId = req.params.equipoId;
    let update = req.body;
    let options = {};

    Equipo.findByIdAndUpdate(equipoId,update,options,function(err,equipoUpdate){
        equipoUpdate.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');
        console.log(`--- UPDATE EQUIPO--- ${new moment()} --->`);
    })

    // return Equipo.update(equipoId,update,options)
    //     .then(function(response){
    //         let equipo = response;
    //         equipo["jugadores"].forEach(function(jugador){
    //
    //             let ids = [];
    //             ids.push(jugador._id);
    //
    //             return Jugador.updateMany(ids,{team:equipo.name},{multi: true})
    //                 .then(function(res){
    //                 console.log(`jugador ------> ${res}`)
    //             })
    //         })
    //     })

    res.status(200).send({message : `jugadores modificados`})


}

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


module.exports = {
    getEquipos,
    getEquipo,
    newEquipo,
    updateEquipo,
    deleteEquipo,
    deleteAllEquipos,
    guardarDraft,
    generarEquipos
};