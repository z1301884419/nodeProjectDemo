const express =require('express');
const LoginRouter=express.Router();
const ctrl=require('../controller/llCtrl');

LoginRouter.get('/login',ctrl.getLogin);
LoginRouter.get('/pages/index.html',ctrl.getUser);


module.exports=LoginRouter