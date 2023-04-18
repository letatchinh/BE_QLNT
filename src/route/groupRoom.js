const express = require('express');
const router = express.Router();

const groupRoomController = require('../app/controller/GroupRoomController')


router.post('/create', groupRoomController.createGroupRoom)
router.get('/', groupRoomController.getGroupRooms)
router.delete('/deleteAll', groupRoomController.deleteAll)
router.put('/:id', groupRoomController.updateGroupRoom)
module.exports = router