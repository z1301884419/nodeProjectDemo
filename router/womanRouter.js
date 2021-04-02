const express = require('express');
const womanCtrl = require('../controller/womanCtrl');
const womanRouter = express.Router();
womanRouter.get('/selectWoman', womanCtrl.selectWoman)
womanRouter.get('/selectWomanImg', womanCtrl.selectWomanImg)
womanRouter.get('/selectClass', womanCtrl.selectClass)
womanRouter.get('/selectPage', womanCtrl.selectPage)
module.exports = womanRouter