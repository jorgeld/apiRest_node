'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquiposSchema = Schema({
    name: String,
    jugadores: Array,
    palmares : Object,
    signupDate : {type : String},
    lastModified : {type : String},
});

module.exports = mongoose.model('Equipo', EquiposSchema);