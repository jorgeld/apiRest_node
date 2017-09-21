'use strict';

const express = require('express');
const UserCtrl = require('../controllers/users');
const api = express.Router();

api.get('/user/:userId', UserCtrl.getUser);
api.get('/users/', UserCtrl.getUsers);
api.post('/user', UserCtrl.newUser);
api.put('/user/update/:userId',UserCtrl.updateUser);
api.delete('/user/delete/:userId',UserCtrl.deleteUser);

module.exports = api;