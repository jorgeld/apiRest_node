'use strict';
const User = require('../modelos/users');
const moment = require('moment');

//Libreria para encriptación de bbdd
const bcrypt = require('bcrypt-nodejs');

function getUser(req, res){
    let userId = req.params.userId;
    User.findById(userId,function(err,user){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!user)return res.status(404).send({message:`El producte no existe`});

        res.status(200).send({user})

    })
}

function getUsers(req, res){
    User.find({},function(err,users){
        if(err){return res.status(500).send({message:`Error al realizar la petición`})}
        if(!users)return res.status(404).send({message:`No existen usuarios`});
        res.status(200).send({users})
    })
}

function newUser(req, res){
    let user = new User();
    user.name = req.body.name;
    user.pass = req.body.pass;
    user.img = req.body.img;
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.signupDate = moment().format('DD/MM/YYYY - HH:MM:SS');
    user.lasLogin = req.body.lasLogin;

    user.save(function (err, userStored) {
        if(err){
            res.status(500).send({message : `Error al salvar en la base de datos ----> ${err}` })
        }
        res.status(200).send({user: userStored})
    })
}

function updateUser(req, res){
    let userId = req.params.userId;
    let update = req.body;
    let options = {};

    User.findByIdAndUpdate(userId,update,options,function(err,userUpdate){
        if(err){
            res.status(500).send({message : `Error al editar el usuario`});
        }


        res.status(200).send({user : userUpdate})
    })
}

function deleteUser(req, res){
    let userId = req.params.userId;

    User.findById(userId,function(err,user){
        if(err)return res.status(500).send({message:`Error al borrar usuario`});

        user.remove(function(err){
            if(err){
                res.status(500).send({message : `Error al borrar el usuario`});
            }
            res.status(200).send({message : `El usuario ha sido eliminado`})
        })

    })
}

function autentificar(req,res){
    console.log('intentando entrar.....');
    User.findOne({'userName': req.body.userName})
        .exec(function(err,user){
            if(err){
                res.status(500).send({message: 'No se ha encontrado usuario'})
            }else{
                if(user == null){
                    res.status(401).send({message: `No se ha encontrado usuarios con esas credenciales`})
                }else{
                    console.log(`Algo hemos encontrado ${user}`);

                    bcrypt.compare(req.body.pass, user.pass , function(err, result){

                        (result === true)
                            ?res.status(200).send({
                                message: `Credenciales correctas`,
                                user: {
                                    name:user.name,
                                    userName:user.userName,
                                    email:user.email
                                }
                            })
                            :res.status(401).send({message:` Identificador de Usuario o pass incorrectos`});
                    })
                }
            }
        })
}

module.exports = {
    getUser,
    getUsers,
    newUser,
    updateUser,
    deleteUser,
    autentificar
};