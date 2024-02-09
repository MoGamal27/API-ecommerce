const express = require('express')
const User = require('../controller/User')
const checkRole = require('../middleware/chekRole')
const {verifyJwt} = require('../middleware/verifyJwt')
const router = express.Router();

router.post('/users',verifyJwt,checkRole(['admin']),User.createNewUser)
router.get('/users',verifyJwt,checkRole(['admin']),User.getAllUsers)
router.get('/users/:id',verifyJwt,checkRole(['admin']),User.getSingleUser)
router.put('/users/:id',verifyJwt,checkRole(['admin']),User.UpdateUser)
router.delete('/users/:id',verifyJwt,checkRole(['admin']),User.deleteSingleUser)

module.exports = router;
