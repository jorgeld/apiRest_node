'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TorneosSchema = Schema({
    campeon: Object,
    subcampeon: Object,
    resultado: String
});

module.exports = mongoose.model('Torneo', TorneosSchema);