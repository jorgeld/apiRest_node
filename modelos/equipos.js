'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquiposSchema = Schema({
    name: String,
    nombreCorto : String,
    bandera: String,
    escudo: String,
    jugadores: Array,
    palmares : Object,
    copas : Number,
    ligas : Number,
    subcampeonatosCopa : Number,
    subcampeonatosLiga : Number,
    signupDate : {type : String}
});

module.exports = mongoose.model('Equipo', EquiposSchema);