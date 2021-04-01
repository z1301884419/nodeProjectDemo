const express = require('express')
const manCtrl = require('../controller/manCtrl')
const manRouter = express.Router()

manRouter.get('/selectMan', manCtrl.selectMan)
manRouter.get('/selectManImg', manCtrl.selectManImg)

module.exports = manRouter