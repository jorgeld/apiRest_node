/**
 * Created by jlainez on 18/09/2017.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

//Libreria para encriptación de bbdd
const bcrypt = require('bcrypt-nodejs');

const UserSchema = Schema({
    name: String,
    // pass: { type:String, select : false},
    pass: { type:String, select : false},
    img : String,
    email : { type:String,unique : true},
    signupDate : {type : Date, default: Date.now()},
    lasLogin : Date,
});

//Función que se ejecuta antes de que el modelo sea almacenado en la base de datos
UserSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('pass'))return next();

    bcrypt.genSalt(10, function (err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.pass, salt, null, function (err, hash) {
            if(err) return next(err);

            user.pass = hash;
            next()
        })
    })
});

// UserSchema.methods.gravatar = function () {
//     if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;
//
//     const md5 =crypto.createHash('md5').update(this.email).digest('hex');
//     return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
// }


module.exports = mongoose.model('User', UserSchema);
