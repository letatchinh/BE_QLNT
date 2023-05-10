const express = require('express');
const router = express.Router();

const roomController = require('../app/controller/RoomController')


router.post('/create', roomController.createRoom)
router.get('/', roomController.getRoom)
router.get('/getRoomById/:idAccount', roomController.getRoomById)
router.delete('/deleteAll', roomController.deleteAll)
router.get('/getListStudent', roomController.getListUser)
router.post('/findRoomForStudent', roomController.findRoomForUser)
router.get('/:id', roomController.getById)
router.put('/addOneUserToRoom/:id', roomController.addOneUserToRoom)
router.get('/getRoomForUser/:username', roomController.getRoomForUser)
router.put('/:id', roomController.updateRoom)
module.exports = router