'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JugadoresSchema = Schema({
    name: String,
    edad : Number,
    img : String,
    lugar : String,
    posicion : String,
    atributos : Object,
    team : Object,
    galardones : Object,
    signupDate : {type : String},
    lastModified : {type : String},
});

module.exports = mongoose.model('Jugador', JugadoresSchema);