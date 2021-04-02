const express =require('express');
const womanRouter=express.Router();
const womanCtrl=require('../controller/womanCtrl');

womanRouter.get('/getAllData',womanCtrl.getAllData)

module.exports=womanRouter