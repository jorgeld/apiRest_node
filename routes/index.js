'use strict';

const express = require('express');
const UserCtrl = require('../controllers/users');
const MonkeysCtrl = require('../controllers/monkeys');
const JugadoresCtrl = require('../controllers/jugadores');
const EquiposCtrl = require('../controllers/equipos');
const PartidosCtrl = require('../controllers/partidos');
const TorneosCtrl = require('../controllers/torneos');
const UtilitiesCtrl = require('../controllers/utils');
const api = express.Router();

// CORS
api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Utilidades
api.get('/utilidades/comunidades', UtilitiesCtrl.getComunidades);
api.get('/utilidades/provincias', UtilitiesCtrl.getProvincias);
api.get('/utilidades/paises', UtilitiesCtrl.getPaises);
api.get('/utilidades/nombres', UtilitiesCtrl.getNombres);
api.get('/utilidades/nombrehombres', UtilitiesCtrl.getNombresHombre);
api.get('/utilidades/nombresmujeres', UtilitiesCtrl.getNombresMujeres);
api.get('/utilidades/apellidos', UtilitiesCtrl.getApellidos);

//Users Services
api.get('/user/:userId', UserCtrl.getUser);
api.get('/users/', UserCtrl.getUsers);
api.post('/user', UserCtrl.newUser);
api.put('/user/update/:userId',UserCtrl.updateUser);
api.delete('/user/delete/:userId',UserCtrl.deleteUser);
api.post('/auth',UserCtrl.autentificar);

//Monkeys Services
api.get('/monkeys/', MonkeysCtrl.getMonkeys);
api.get('/monkey/:monkeyId', MonkeysCtrl.getMonkey);
api.post('/monkey', MonkeysCtrl.newMonkey);
api.put('/monkey/update/:monkeyId', MonkeysCtrl.updateMonkey);
api.delete('/monkey/delete/:monkeyId',MonkeysCtrl.deleteMonkey);
api.get('/monkey/banana/:monkeyId' , MonkeysCtrl.putBanana);

//Jugadores Services
api.get('/jugadores/', JugadoresCtrl.getJugadores);
api.get('/jugador/:jugadorId', JugadoresCtrl.getJugador);
api.post('/jugador', JugadoresCtrl.newJugador);
api.post('/hornadajugadores', JugadoresCtrl.generarHornada);
api.put('/jugador/update/:jugadorId', JugadoresCtrl.updateJugador);
api.delete('/jugador/delete/:jugadorId',JugadoresCtrl.deleteJugador);
api.get('/deleteAllJugadores',JugadoresCtrl.deleteAllJugadores);

//Equipos Services
api.get('/equipos/', EquiposCtrl.getEquipos);
api.get('/equipo/:equipoId', EquiposCtrl.getEquipo);
api.get('/equipo-players/:equipoId', EquiposCtrl.getEquipoPlayers);
api.post('/equipo', EquiposCtrl.newEquipo);
api.post('/equipos/guardarDraft',EquiposCtrl.guardarDraft);
api.put('/equipo/update/:equipoId', EquiposCtrl.updateEquipo);
api.delete('/equipo/delete/:equipoId',EquiposCtrl.deleteEquipo);
api.delete('/deleteAllEquipos',EquiposCtrl.deleteAllEquipos);
api.get('/generarEquipos',EquiposCtrl.generarEquipos);

//Partidos
api.post('/partido', PartidosCtrl.newPartido);
api.get('/partidos', PartidosCtrl.getPartidos);
api.get('/partido/:partidoId', PartidosCtrl.getPartido);
api.put('/partido/update/:partidoId', PartidosCtrl.updateEquipo);
api.delete('/partido/delete/:partidoId', PartidosCtrl.deletePartido);
api.delete('/deleteAllPartidos', PartidosCtrl.deleteAllPartidos);

//Torneos
api.post('/torneo', TorneosCtrl.newTorneo);
api.get('/torneos', TorneosCtrl.getTorneos);
api.get('/deleteAllTorneos', TorneosCtrl.deleteAllTorneos);

// http://localhost:3000/api/monkey/banana/

module.exports = api;