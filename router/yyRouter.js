const {Router} = require('express')
const yyRouter = new (Router)
const yyCtrl = require('../controller/yyCtrl')
yyRouter.get('/shopInfo_hot',yyCtrl.hot_Info)
yyRouter.get('/shopInfo_sale',yyCtrl.sale_Info)
yyRouter.get('/shopInfo_new',yyCtrl.new_Info)
yyRouter.get('/yy_shopInfo',yyCtrl.shop_Info)
yyRouter.get('/addCar',yyCtrl.addCar)
module.exports = yyRouter