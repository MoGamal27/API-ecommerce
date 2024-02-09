const express = require('express')
const registerController = require('../controller/registerController')
const loginController = require('../controller/loginController')
const router = express.Router();

router.post('/register',registerController.register)
router.post('/login',loginController.login)




module.exports = router;


