const express = require('express');
const cartRouter = express.Router();
const cartcontrol = require('../controller/cartCtrl');

// 渲染数据的接口
cartRouter.get('/cartInfo', cartcontrol.cartInfo);
// 清空购物车
cartRouter.post('/clearAll', cartcontrol.clearAll);
// 加减请求
cartRouter.get('/modifyCartNum', cartcontrol.modifyCartNum);

cartRouter.get('/searchCart', cartcontrol.searchCart);

cartRouter.get('/checkOutSelect', cartcontrol.checkOutSelect);

cartRouter.post('/checkOut', cartcontrol.checkOut)

module.exports = cartRouter;