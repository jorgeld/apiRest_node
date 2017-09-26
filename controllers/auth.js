'Use strict'

const mongoose = require('mongoose');
const User = require('../modelos/users')

function signUp(){
    const user = new User({
        email:req.body.email,
        name:req.body.name,
    })

    user.save(function (err) {
        if(err){
            res.status(500).send({message : 'Error al crear usuario'})
        }else{
            return res.status(200).send({token : service.createToken(user)})
        }
    })
}

function singIn(){

}

module.exports = {
    signUp,
    singIn
};