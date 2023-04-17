const express = require('express');
const router = express.Router();

const BremController = require('../app/controller/BremController')


router.post('/create', BremController.createBrem)
router.get('/', BremController.getBream)
router.get('/lastNumber', BremController.getLastBremNumber)
router.get('/:id', BremController.getOneBream)
router.put('/:id', BremController.updateBrem)
router.delete('/deleteAll', BremController.deleteAll)
router.delete('/:id', BremController.deleteBrem)
module.exports = router