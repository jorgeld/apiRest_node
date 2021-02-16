'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const port = process.env.PORT || 3002;

const MONGODB_URI = "mongodb+srv://admin:admin@cluster0.7tyxz.mongodb.net/bananas?retryWrites=true&w=majority";

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((db) => console.log("Mongodb is connected to", db.connection.host))
    .catch((err) => console.error(err));

// // Conectamos a la bbdd
// mongoose.connect(config.db,function(err, res){
//     if(err){
//         return console.log(`Error al conectar a la BBDD: ${err}`)
//     }else{
//         console.log('Conexión a la Base de datos establecida');
//     }
//
//     app.on('Escuchando ---> ' , function(){
//         console.log('Servidor Funcionando ....')
//     });
//
//     app.listen(config.port,() => {
//         console.log(`API REST corriendo en http://localhost:${config.port}`);
//     });
//
// });
