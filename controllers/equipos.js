'use strict';

const Equipo = require('../modelos/equipos');
const moment = require('moment');
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
    equipo.jugadores = null;
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

function updateEquipo(req,res){

    let equipoId = req.params.equipoId;
    let update = req.body;
    let options = {};
    Equipo.findByIdAndUpdate(equipoId,update,options,function(err,equipoUpdate){
        equipoUpdate.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');
        if(err){
            res.status(500).send({message : `Error al editar equipo`});
        }
        console.log(`--- UPDATE EQUIPO--- ${new moment()} --->`);
        res.status(200).send({equipo : equipoUpdate})
    })

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


module.exports = {
    getEquipos,
    getEquipo,
    newEquipo,
    updateEquipo,
    deleteEquipo
};