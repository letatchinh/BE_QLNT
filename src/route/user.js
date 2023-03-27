const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController')


router.post('/create', userController.createUser)
module.exports = router