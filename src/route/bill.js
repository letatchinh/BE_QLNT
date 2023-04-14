const express = require('express');
const router = express.Router();

const BillController = require('../app/controller/BillController')


router.post('/create', BillController.createBill)
router.get('/', BillController.getBill)
router.get('/getOne', BillController.getOneBill)
router.delete('/deleteAll', BillController.deleteAll)
module.exports = router