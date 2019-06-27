'use strict';

const Torneo = require('../modelos/torneos');
const Equipo = require('../modelos/equipos');
const async = require('async');
const assert = require('assert');
const moment = require('moment');

function getTorneos(req, res){
    Torneo.find({},function(err,torneo){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!torneo)return res.status(404).send({message:`No existen torneos`});
        console.log(` **** Recogiendo histórico torneos ${new moment()}`);
        res.status(200).send({torneo})
    })
}

function newTorneo(req , res){

    let torneo = new Torneo();
    let _campeon = req.body.campeon;
    let _subcampeon = req.body.subcampeon;

    console.log('campeon --> ' , _campeon)
    console.log('subcampeon --> ' , _subcampeon)

    let query_camp = Equipo.findOne({_id: _campeon});
    assert.ok(!(query_camp instanceof Promise));

    let query_sub = Equipo.findOne({_id: _subcampeon});
    assert.ok(!(query_sub instanceof Promise));

    query_camp.then(function(doc){
        torneo.campeon = doc;
        query_sub.then(function(doc2){
            torneo.subcampeon = doc2;
            torneo.resultado = req.body.resultado;

            torneo.save(function (err, torneoStored) {
                if(err){
                    res.status(500).send({message : `Error al salvar torneo en la base de datos ----> ${err}` })
                }
                res.status(200).send({torneo: torneoStored})
            })
        })
    })
}


function deleteAllTorneos(req, res){

    // El objeto vacio recoge todos los elementos de la colección
    Torneo.remove({},function(err,docs){
        if(!err){
            console.log(` **** Eliminando todos el histórico de torneos ----> ${new moment()}`);
            res.status(200).send({message : 'Histórico de torneos borrados correctamente'})
        }else{
            res.status(500).send({error : 'Error al borrar histórico de torneos'})
        }
    });
}

module.exports = {
    getTorneos,
    newTorneo,
    deleteAllTorneos
};

