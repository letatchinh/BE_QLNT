const express = require('express');
const router = express.Router();

const MeterController = require('../app/controller/MeterController')


router.post('/create', MeterController.createMeter)
router.get('/', MeterController.getMeter)
router.get('/getOne', MeterController.getOneMeter)
router.get('/getPreAndMonthNow', MeterController.getPreAndMonthNow)
router.delete('/deleteAll', MeterController.deleteAll)
router.post('/createOrUpdate', MeterController.createOrUpdate)
router.get('/:id', MeterController.getById)
router.delete('/:id', MeterController.deleteMeter)
router.put('/:id', MeterController.updateMeter)
module.exports = router