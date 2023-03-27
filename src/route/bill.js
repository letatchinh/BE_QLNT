const express = require('express');
const router = express.Router();

const BillController = require('../app/controller/BillController')


router.post('/create', BillController.createBill)
module.exports = router