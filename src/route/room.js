const express = require('express');
const router = express.Router();

const roomController = require('../app/controller/RoomController')


router.post('/create', roomController.createRoom)
module.exports = router