const express = require('express');
const route = express.Router();
const HotelController = require('../Controllers/HotelController');
const isAdmin = require('../Auth/isAuth').isAdmin;

route.get('/hotels/:id', HotelController.findHotelById);
route.get('/hotels', HotelController.getHotel);
route.post('/hotels', HotelController.findHotel);
route.get('/delhotels/:id', isAdmin, HotelController.deleteHotelById);
route.post('/addhotel', isAdmin, HotelController.addNewHotel);
route.post('/edithotel', isAdmin, HotelController.editHotel);

module.exports = route;
