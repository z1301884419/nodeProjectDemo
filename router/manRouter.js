const express = require('express')
const manCtrl = require('../controller/manCtrl')
const manRouter = express.Router()

manRouter.get('/selectMan', manCtrl.selectMan)
manRouter.get('/selectManImg', manCtrl.selectManImg)
manRouter.get('/selectmymy', manCtrl.selectmymy)
// manRouter.get('/selectxinpin', manCtrl.selectxinpin)
module.exports = manRouter