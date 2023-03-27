const express = require('express');
const router = express.Router();

const BremController = require('../app/controller/BremController')


router.post('/create', BremController.createBrem)
module.exports = router