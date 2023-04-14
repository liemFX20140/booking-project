const express = require('express');
const route = express.Router();
const UserController = require('../Controllers/UserController');
const isAdmin = require('../Auth/isAuth').isAdmin;

route.post('/user', UserController.postAddUser);
route.post('/userlogin', UserController.postUserLogIn);
route.get('/users/clients', isAdmin, UserController.getClient);
route.get('/users/getlogin', UserController.getLogin);
route.get('/user/logout', UserController.getLogOut);
module.exports = route;
