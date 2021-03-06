'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonkeySchema = Schema({
    name: String,
    img : String,
    sexo : String,
    pais : String,
    bananas : Number,
    signupDate : {type : String},
    lastModified : {type : String},
});

module.exports = mongoose.model('Monkey', MonkeySchema);