const express = require('express');
const cartRouter = express.Router();
const cartcontrol = require('../controller/cartCtrl');

cartRouter.get('/cartInfo', cartcontrol.cartInfo);
cartRouter.post('/clearAll', cartcontrol.clearAll);

module.exports = cartRouter;