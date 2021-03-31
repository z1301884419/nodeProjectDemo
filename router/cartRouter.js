const express = require('express');
const router = require('../../../第三阶段/LOGIN/router/router');
const cartRouter = express.Router();
const cartcontrol = require('../controller/cartCtrl');

router.get('/cartInfo', cartcontrol.cartInfo);


module.exports = cartRouter;