'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FederacionesSchema = Schema({
    nombre: String,
    nombreCorto : String,
    bandera: String,
    equipos: Array,
    signupDate : {type : String},
    campeonActual : Object,
    subcampeon : Object,
    tercero : Object,
});

module.exports = mongoose.model('federaciones', FederacionesSchema);