const express = require('express');
const router = express.Router();

const accountController = require('../app/controller/AccountController')


router.post('/create', accountController.createAccount)
router.get('/', accountController.getAccounts)
router.delete('/deleteAll', accountController.deleteAll)
router.put('/:id', accountController.updateAccount)
router.post('/login', accountController.login)
module.exports = router