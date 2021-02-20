'use strict';

const Federaciones = require('../modelos/federaciones');
const Jugador = require('../modelos/jugadores');
const EquiposFederacion = require('../modelos/equiposFederacion');
const moment = require('moment');
const constantes = require('../constantes');
const express = require('express');
const app = express();

function generarEquiposFederacion(req,res){

    let equiposfed = constantes.equiposFed;

    //Añadimos el id de la federacion y los jugadors
    addAtributosEquipos(equiposfed)
        .then((res)=>{
            //Insertamos ne BBDD
            insertEquiposFed(res)
        });

    res.status(200).send('ok')
}

function generateFederaciones(req,res){

    let federaciones = constantes.federaciones;

    Federaciones.insertMany(federaciones,(err,doc) => {
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
    });

    res.status(200).send(`Generadas las federaciones correctamente`)
};

// //Generamos listado de equipos
function generarEquipos(req, res){

    let equiposfed = constantes.equiposFed;

    //Añadimos jugadores a cada uno de los equipos
    for(let i = 0; i < equiposfed.length; i++){
        equiposfed[i].jugadores = generateJugadoresFederaciones();
    }

    EquiposFederacion.insertMany(equiposfed,(err, doc)=>{
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
    });

    // Federaciones.findOne({ nombreCorto: 'AND' },(err, federacion)=>{
    //     console.log(federacion)
    // });

    res.status(200).send({equiposfed})

    // let federaciones = constantes.federaciones;
    //
    // console.log(`federaciones --> ` , federaciones);
    //
    // Federaciones.insertMany(federaciones,(err,docs)=>{
    //     if(err){
    //         res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
    //     }
    // });

    // Federaciones.find({},function(err,federaciones){
    //     if(err){return res.status(500).send({message:`Error al realizar la petición`})}
    //     if(!federaciones)return res.status(404).send({message:`No existen Federeciones`});
    //     console.log(` **** Recogiendo listado de federaciones ${new moment()}`);
    //     res.status(200).send({federaciones})
    // });

    // res.status(200).send({message : 'OK'});



    // //recorremos las federaciones
    // for(let i = 0; i < federaciones.length; i++){
    //     //Si tenemos los equipos por federacion hechos
    //     if(federaciones[i].equipos.length > 0){
    //         //Recorremos los equipos
    //         federaciones[i].equipos.jugadores = generateJugadoresFederaciones();
    //     }
    // }
    //
    //
    // Federaciones.insertMany(federaciones,function(err,docs){
    //     if(err){
    //         res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
    //     }
    //     console.log(` **** Generados nuevos equipos--- ${new moment()} --->`);
    //     res.status(200).send({message : 'Equipos generados correctamente correctamente'})
    // });
}

function getEquiposFederacion(req,res){

    EquiposFederacion.find({federacion:req.body.nombreCorto},(err, federacion)=>{
        console.log(` ++++++ Recogemos equipos federativos ${req.body.nombreCorto} ++++++`);
        res.status(200).send(federacion)
    });

}

function getFederaciones(req,res){
    Federaciones.find({},function(err,federaciones){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!federaciones)return res.status(404).send({message:`No existen Federeciones`});
        console.log(` **** Recogiendo listado de federaciones ${new moment()}`);
        res.status(200).send({federaciones})
    })
}

function getFederacion(req,res){
    let id = req.params.id;
    Federaciones.findById(id,function(err,fed){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!fed)return res.status(404).send({message:`La federación no existe`});
        res.status(200).send({fed})
    })
}

function actualizarCampeon(req, res){

    let fedId = req.params.id;
    let update = req.body;

    Federaciones.findById(fedId, function (err, fed) {

        if (err) return res.status(500).send({message: `****** Error al editar federación`});

        // console.log('FEDERACIÓN ----> ' , fed);
        for (let i = 0; i < fed.equipos.length; i++) {
            if (fed.equipos[i].nombre_corto == update.nombre_corto) {
                console.log(' ******* ACTUALIZAR PALMARÉS--------> ', update.nombre_corto);

                //Aumentamos palmarés ...
                var palmares;
                if (fed.equipos[i].palmares) {
                    palmares = fed.equipos[i].palmares;
                    palmares.liga += 1;
                    fed.equipos[i].palmares = palmares
                } else {
                    palmares = {liga: 1}
                    fed.equipos[i].palmares = palmares
                }

                fed.update({equipos: fed.equipos}, function (err) {
                    if (err) {
                        res.status(500).send({message: `****** Error al modificar palmarés`});
                    }

                    fed.update({campeonActual: update}, function (err) {
                        if (err) {
                            res.status(500).send({message: `****** Error al cambiar el campeón actual`});
                        }
                        res.status(200).send(`Actualizado el palmarés de ${update.nombre_corto}`)
                    })
                })

            }
        }
    })
}

function palmaresCampeonNacional(req, res){

    let campeon = req.body;

    Federaciones.find({},function(err,federaciones){
        if(err){return res.status(500).send({message:`Error al recoger federaciones`})}
        if(!federaciones)return res.status(404).send({message:`No existen Federeciones`});
        console.log(` **** Recogiendo listado de federaciones ${new moment()}`)

        //Recorremos federaciones
        for(let i = 0; i < federaciones.length; i++){

            console.log(` ***** FED: ${federaciones[i].nombreCorto} ********* ${campeon.federacion.nombreCorto} ******************************** `)

            if(federaciones[i].nombreCorto == campeon.federacion.nombreCorto){
                console.log(` ******* federación a la que pertenece ----> ${federaciones[i].nombreCorto}`);

                //Recorremos los equipos de la federación
                for (let j = 0; j < federaciones[i].equipos.length; j++) {
                    if (federaciones[i].equipos[j].nombre_corto == campeon.nombre_corto) {
                        console.log(' ******* ACTUALIZAR PALMARÉS DE --------> : ', campeon.nombre_corto);

                        //Aumentamos palmarés ...
                        var palmares;
                        if (federaciones[i].equipos[j].palmares) {
                            palmares = federaciones[i].equipos[j].palmares;
                            palmares.copa += 1;
                            federaciones[i].equipos[j].palmares = palmares
                        } else {
                            palmares = {copa: 1}
                            federaciones[i].equipos[j].palmares = palmares
                        }

                        federaciones[i].update({equipos: federaciones[i].equipos}, function (err) {
                            if (err) {
                                res.status(500).send({message: `****** Error al modificar palmarés`});
                            }
                            res.status(200).send(`Actualizado el palmarés de ${campeon.nombre_corto}`
                            )
                        })
                    }
                }

            }
        }

    })
}

function palmaresCampeonRecopa(req, res){
    let campeon = req.body;

    Federaciones.find({},function(err,federaciones){
        if(err){return res.status(500).send({message:`Error al recoger federaciones`})}
        if(!federaciones)return res.status(404).send({message:`No existen Federeciones`});
        console.log(` **** Recogiendo listado de federaciones ${new moment()}`)

        //Recorremos federaciones
        for(let i = 0; i < federaciones.length; i++){

            console.log(` ***** FED: ${federaciones[i].nombreCorto} ********* ${campeon.federacion.nombreCorto} ******************************** `)

            if(federaciones[i].nombreCorto == campeon.federacion.nombreCorto){
                console.log(` ******* federación a la que pertenece ----> ${federaciones[i].nombreCorto}`);

                //Recorremos los equipos de la federación
                for (let j = 0; j < federaciones[i].equipos.length; j++) {
                    if (federaciones[i].equipos[j].nombre_corto == campeon.nombre_corto) {
                        console.log(' ******* ACTUALIZAR PALMARÉS DE --------> : ', campeon.nombre_corto);

                        //Aumentamos palmarés ...
                        var palmares;
                        if (federaciones[i].equipos[j].palmares) {
                            palmares = federaciones[i].equipos[j].palmares;
                            palmares.recopa += 1;
                            federaciones[i].equipos[j].palmares = palmares
                        } else {
                            palmares = {recopa: 1}
                            federaciones[i].equipos[j].palmares = palmares
                        }

                        federaciones[i].update({equipos: federaciones[i].equipos}, function (err) {
                            if (err) {
                                res.status(500).send({message: `****** Error al modificar palmarés`});
                            }
                            res.status(200).send(`Actualizado el palmarés de ${campeon.nombre_corto}`
                            )
                        })
                    }
                }

            }
        }

    })
}

function palmaresCampeonFerias(req, res){
    Federaciones.find({},function(err,federaciones){
        if(err){return res.status(500).send({message:`Error al recoger federaciones`})}
        if(!federaciones)return res.status(404).send({message:`No existen Federeciones`});
        console.log(` **** Recogiendo listado de federaciones ${new moment()}`)

        //Recorremos federaciones
        for(let i = 0; i < federaciones.length; i++){

            console.log(` ***** FED: ${federaciones[i].nombreCorto} ********* ${campeon.federacion.nombreCorto} ******************************** `)

            if(federaciones[i].nombreCorto == campeon.federacion.nombreCorto){
                console.log(` ******* federación a la que pertenece ----> ${federaciones[i].nombreCorto}`);

                //Recorremos los equipos de la federación
                for (let j = 0; j < federaciones[i].equipos.length; j++) {
                    if (federaciones[i].equipos[j].nombre_corto == campeon.nombre_corto) {
                        console.log(' ******* ACTUALIZAR PALMARÉS DE --------> : ', campeon.nombre_corto);

                        //Aumentamos palmarés ...
                        var palmares;
                        if (federaciones[i].equipos[j].palmares) {
                            palmares = federaciones[i].equipos[j].palmares;
                            palmares.ferias += 1;
                            federaciones[i].equipos[j].palmares = palmares
                        } else {
                            palmares = {ferias: 1}
                            federaciones[i].equipos[j].palmares = palmares
                        }

                        federaciones[i].update({equipos: federaciones[i].equipos}, function (err) {
                            if (err) {
                                res.status(500).send({message: `****** Error al modificar palmarés`});
                            }
                            res.status(200).send(`Actualizado el palmarés de ${campeon.nombre_corto}`
                            )
                        })
                    }
                }

            }
        }

    })
}

function actualizarSubcampeon(req, res){

    let fedId = req.params.id;
    let update = req.body;

    Federaciones.findById(fedId,function(err,fed){

        if(err)return res.status(500).send({message:`****** Error al editar federación`});

        fed.update({subcampeon : update},function(err){
            if(err){
                res.status(500).send({message : `****** Error al cambiar el subcampeon actual`});
            }
            res.status(200).send({subcampeon : update})
        })
    })
}

function actualizarTercero(req, res){

    let fedId = req.params.id;
    let update = req.body;

    Federaciones.findById(fedId,function(err,fed){

        if(err)return res.status(500).send({message:`****** Error al editar federación`});

        fed.update({tercero : update},function(err){
            if(err){
                res.status(500).send({message : `****** Error al cambiar el tercero actual`});
            }
            res.status(200).send({tercero : update})
        })
    })
}

function rellenarPlantillaFederacion(req, res){

    Federaciones.findById(req.params.id,function(err,fed){

        if(err)return res.status(500).send({message:`****** Error al editar federación`});

        generamosJugadoresEquipo(fed);

        res.status(200).send({message:`****** Federación encontrada`});

    })
}

//Genera jugador
function newJugador(posicion){

    let jugador = new Jugador();

    var aleatorioNombre = Math.floor((Math.random() * constantes.nombreshombre.length -1) + 1);
    var aleatorioApellido = Math.floor((Math.random() * constantes.apellidos.length -1) + 1);
    var aleatorioProvincia = Math.floor((Math.random() * constantes.provincias.length -1) + 1);

    jugador.name = `${constantes.nombreshombre[aleatorioNombre]} ${constantes.apellidos[aleatorioApellido]}`;
    jugador.lugar = constantes.provincias[aleatorioProvincia].toUpperCase();
    jugador.edad = Math.floor((Math.random() * (22 - 18) + 18));
    jugador.atributos = {
        ataque : Math.floor((Math.random() * (99 - 10) + 10)),
        defensa : Math.floor((Math.random() * (99 - 10) + 10)),
        rebotes : Math.floor((Math.random() * (99 - 10) + 10)),
        pase : Math.floor((Math.random() * (99 - 10) + 10)),
        agresividad : Math.floor((Math.random() * (99 - 10) + 10)),
        sexualidad : Math.floor((Math.random() * (99 - 10) + 10)),
    };
    jugador.posicion = posicion;
    jugador.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
    jugador.lastModified = moment().format('DD/MM/YYYY - HH:MM:SS');

    return jugador
}

//Genera plantilla
function generateJugadoresFederaciones(){

    let posiciones = constantes.posiciones;
    let jugadores = [];

    for(let i = 0; i < posiciones.length; i++){
        for (let y = 0; y < 2; y++){
            jugadores.push(newJugador(posiciones[i]))
        }
    }
    return jugadores;
}

async function generamosJugadoresEquipo(fed){
    let equipos  = fed.equipos;

    console.log(`--- equipos de federación ----> ${equipos.length}`);

    for(let i = 0; i < equipos.length; i++){
        equipos[i].jugadores = generateJugadoresFederaciones();
        console.log(` -- Equipo --> ${equipos[i].name}`);
        await fed.update({equipos : equipos},function(err,res){
            if(err){
                res.status(500).send({message : `****** Error al editar federación`});
            }
        })
    }
}

//Añade el id de la federacion y lo jugadores a cada uno de los equipos
async function addAtributosEquipos(equiposfede){

    let equiposfed = equiposfede;

    for(let i = 0; i < equiposfed.length; i++){
        //Recogemos el id de cada federacion
        await getIdFed(equiposfed[i].federacion)
            .then((res)=>{
                equiposfed[i].idFed = res._id;
                equiposfed[i].jugadores = generateJugadoresFederaciones();
            });
    }
    return equiposfed;
}

//inserta los equipos en la bbdd
async function insertEquiposFed(equipos){
    await EquiposFederacion.insertMany(equipos,(err, doc)=>{
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
    });
}

//Recoge el id de la federacion
async function getIdFed(fed){
    let id = await Federaciones.findOne({ nombreCorto: fed},'_id').exec();
    return id;
}

module.exports = {
    getFederaciones,
    generarEquipos,
    generarEquiposFederacion,
    generateFederaciones,
    rellenarPlantillaFederacion,
    getFederacion,
    getEquiposFederacion,
    actualizarCampeon,
    actualizarSubcampeon,
    actualizarTercero,
    palmaresCampeonNacional,
    palmaresCampeonRecopa,
    palmaresCampeonFerias,
};