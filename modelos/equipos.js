'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquiposSchema = Schema({
    name: String,
    bandera: String,
    escudo: String,
    jugadores: Array,
    palmares : Number,
    signupDate : {type : String},
    lastModified : {type : String},
});

module.exports = mongoose.model('Equipo', EquiposSchema);