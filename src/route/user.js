const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController')


router.post('/create', userController.createUser)
router.get('/', userController.getUsers)
router.delete('/deleteAll', userController.deleteAll)
module.exports = router