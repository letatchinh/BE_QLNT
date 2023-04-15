const express = require('express');
const NodeMailer = require('../app/service/NodeMailer');
const router = express.Router();



router.post('/sendMail', NodeMailer.sendMail)

module.exports = router