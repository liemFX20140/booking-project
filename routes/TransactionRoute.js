const express = require('express');
const route = express.Router();
const controller = require('../Controllers/TransactionController');
const isAuth = require('../Auth/isAuth');

route.post('/transaction', isAuth.isLogin, controller.addTransaction);
route.get('/transaction/:user', isAuth.isLogin, controller.transactionByUserId);
route.get('/transaction', isAuth.isAdmin, controller.getTransactions);
module.exports = route;
