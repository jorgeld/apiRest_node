'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoFederacionSchema = Schema({
    name: String,
    nombreCorto : String,
    bandera: String,
    escudo: String,
    federacion: String,
    idFed:String,
    jugadores: Array,
    palmares : Object,
    ligas : Number,
    signupDate : {type : String}
});

module.exports = mongoose.model('Equiposfederacion', EquipoFederacionSchema);