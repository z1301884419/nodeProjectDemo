const {Router} = require('express')
const yyRouter = new (Router)
const yyCtrl = require('../controller/yyCtrl')
yyRouter.get('/shopInfo',yyCtrl.selectInfo)
module.exports = yyRouter