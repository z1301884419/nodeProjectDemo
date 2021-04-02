const express =require('express');
const orderRouter=express.Router();
const ordercontrol=require('../controller/orderCtrl');

orderRouter.get('/orderAll',ordercontrol.orderAll);

module.exports=orderRouter