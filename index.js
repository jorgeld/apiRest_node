'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const port = process.env.PORT || 3002;

// Conectamos a la bbdd
mongoose.connect(config.db,function(err, res){
    if(err){
        return console.log(`Error al conectar a la BBDD: ${err}`)
    }else{
        console.log('Conexión a la Base de datos establecida');
    }

    app.on('Escuchando ---> ' , function(){
        console.log('Servidor Funcionando ....')
    });

    app.listen(config.port,() => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    });

});
