const express = require('express');
const cartRouter = express.Router();
const cartcontrol = require('../controller/cartCtrl');

cartRouter.get('/cartInfo', cartcontrol.cartInfo);

module.exports = cartRouter;