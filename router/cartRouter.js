const express = require('express');
const cartRouter = express.Router();
const cartcontrol = require('../controller/cartCtrl');

cartRouter.get('/pages/cart.html', cartcontrol.cartInfo);

module.exports = cartRouter;