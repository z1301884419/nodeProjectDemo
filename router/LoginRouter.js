const express =require('express');
const LoginRouter=express.Router();
const ctrl=require('../controller/llCtrl');

LoginRouter.get('/login',ctrl.getLogin);


module.exports=LoginRouter