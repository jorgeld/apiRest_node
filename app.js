/**
 * Created by jlainez on 21/09/2017.
 */
'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes');

// Permitimos los métodos GET, PUT, POST, DELETE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',api);

module.exports = app;