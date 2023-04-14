const express = require('express');
const route = express.Router();
const roomController = require('../Controllers/RoomController');
const isAdmin = require('../Auth/isAuth').isAdmin;

route.get('/rooms', roomController.getRoom);
route.get('/delroom/:id', isAdmin, roomController.delRoomById);
route.post('/addroom', isAdmin, roomController.addRoom);
route.post('/editroom', isAdmin, roomController.editRoom);

module.exports = route;
