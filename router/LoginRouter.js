const express =require('express');
const LoginRouter=express.Router();
const ctrl=require('../controller/llCtrl');

LoginRouter.post('/login',ctrl.getLogin);
LoginRouter.get('/userInfo',ctrl.getUser);
LoginRouter.get('/loginOut',ctrl.loginOut);
LoginRouter.post('/modifyName',ctrl.modifyName);


module.exports=LoginRouter