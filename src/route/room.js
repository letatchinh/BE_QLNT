const express = require('express');
const router = express.Router();

const roomController = require('../app/controller/RoomController')


router.post('/create', roomController.createRoom)
router.get('/', roomController.getRoom)
router.delete('/deleteAll', roomController.deleteAll)
router.get('/:id', roomController.getById)
router.put('/:id', roomController.updateRoom)
module.exports = router