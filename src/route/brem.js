const express = require('express');
const router = express.Router();

const BremController = require('../app/controller/BremController')


router.post('/create', BremController.createBrem)
router.get('/', BremController.getBream)
router.get('/lastNumber', BremController.getLastBremNumber)
router.get('/:id', BremController.getOneBream)
router.delete('/:id', BremController.deleteBrem)
router.put('/:id', BremController.updateBrem)
module.exports = router