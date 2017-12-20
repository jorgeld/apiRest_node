'use strict';

const express = require('express');
const UserCtrl = require('../controllers/users');
const MonkeysCtrl = require('../controllers/monkeys');
const JugadoresCtrl = require('../controllers/jugadores');
const api = express.Router();

// CORS
api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
api.put('/jugador/update/:jugadorId', JugadoresCtrl.updateJugador);
api.delete('/jugador/delete/:jugadorId',JugadoresCtrl.deleteJugador);


// http://localhost:3000/api/monkey/banana/

module.exports = api;