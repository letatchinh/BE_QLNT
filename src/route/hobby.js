const express = require('express');
const router = express.Router();

const hobbyController = require('../app/controller/HobbyController')


router.post('/create', hobbyController.createHobby)
router.get('/', hobbyController.getHobbys)
router.delete('/deleteAll', hobbyController.deleteAll)
router.put('/:id', hobbyController.updateHobby)
module.exports = router