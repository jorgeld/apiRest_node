'use strict';

const Partido = require('../modelos/partidos');
const moment = require('moment');

function newPartido(req , res){
    let partido = new Partido();

    partido.equipoLocal = req.body.equipoLocal;
    partido.equipoVisitante = req.body.equipoVisitante;
    partido.fecha = moment().format('DD/MM/YYYY - HH:MM:SS');
    partido.marcadorLocal = req.body.marcadorLocal;
    partido.marcadorVisitante = req.body.marcadorVisitante;
    partido.ganador = req.body.ganador;

    partido.save(function (err, partidoStored) {
        if(err){
            res.status(500).send({message : `Error al salvar partido en la base de datos ----> ${err}` })
        }
        console.log(`--- NEW PARTIDO--- ${new moment()} --->`);
        res.status(200).send({partido: partidoStored})
    })
}

function getPartidos(req, res){
    Partido.find({},function(err,partidos){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!partidos)return res.status(404).send({message:`No existen partidos`});
        console.log(` **** Recogiendo listado de partidos ${new moment()}`);
        res.status(200).send({partidos})
    })
}

function getPartido(req, res){
    let partidoId = req.params.partidoId;
    Partido.findById(partidoId,function(err,partido){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!partido)return res.status(404).send({message:`El partido no existe`});
        res.status(200).send({partido})
    })
}

function updateEquipo(req,res){
    let partidoId = req.params.partidoId;
    //todo: pendiente el añadir en el body solo los campos deseados, actualmente insertamos todos
    let update = req.body;
    let options = {};
    Partido.findByIdAndUpdate(partidoId,update,options,function(err,partidoUpdate){
        console.log(`--- UPDATE EQUIPO--- ${new moment()} --->`);
    });
    res.status(200).send({message : `partido modificado`})
}

function deletePartido(req, res){
    let partidoId = req.params.partidoId;
    Partido.findById(partidoId,function(err,partido){
        if(err)return res.status(500).send({message:`Error al borrar equipo`});
        partido.remove(function(err){
            if(err){
                res.status(500).send({message : `Error al borrar partido`});
            }
            console.log(`--- DELETE PARTIDO--- ${new moment()} --->`);
            res.status(200).send({message : `El partido ha sido eliminado`})
        })
    })
}

function deleteAllPartidos(req, res){
    // El objeto vacio recoge todos los elementos de la colección
    Partido.remove({},function(err,docs){
        if(!err){
            console.log(` **** Eliminando todos los partidos ----> ${new moment()}`);
            res.status(200).send({message : 'Equipo borrados correctamente'})
        }else{
            res.status(500).send({error : 'Error al borrar partidos'})
        }
    });
}


module.exports = {
    newPartido,
    getPartidos,
    getPartido,
    updateEquipo,
    deletePartido,
    deleteAllPartidos
};