/**
 * Created by jlainez on 21/09/2017.
 */
'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',api);

module.exports = app;