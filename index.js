'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const port = process.env.PORT || 3002;

const MONGODB_URI = "mongodb+srv://admin:Alcobendas1986@cluster0.7tyxz.mongodb.net/bananas?retryWrites=true&w=majority";

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((db) => console.log("Mongodb is connected to", db.connection.port))
    .catch((err) => console.error(err));

    app.listen(config.port,() => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    });

