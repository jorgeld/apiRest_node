'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidosSchema = Schema({
    equipoLocal: String,
    equipoVisitante: String,
    fecha : {type : String},
    marcadorLocal : {type : Number},
    marcadorVisitante : {type : Number},
    ganador : {type : String}
});

module.exports = mongoose.model('Partido', PartidosSchema);