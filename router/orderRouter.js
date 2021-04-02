const express =require('express');
const orderRouter=express.Router();
const ordercontrol=require('../controller/orderCtrl');

orderRouter.get('/orderAll',ordercontrol.orderAll);
orderRouter.post('/delOrder',ordercontrol.delOrder);
orderRouter.get('/payOrder',ordercontrol.payOrder);
orderRouter.post('/modifyState',ordercontrol.modifyState);

module.exports=orderRouter