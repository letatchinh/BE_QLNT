const express = require('express');
const router = express.Router();

const requestJoinRoomController = require('../app/controller/RequestJoinRoom')


router.post('/create', requestJoinRoomController.createRequestJoinRoom)
router.get('/', requestJoinRoomController.getRequestJoinRooms)
router.delete('/deleteAll', requestJoinRoomController.deleteAll)
router.put('/:id', requestJoinRoomController.updateRequestJoinRoom)
module.exports = router