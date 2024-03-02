const express = require('express')
const router = express.Router()

const userContorller = require('../controller/userController')



// Register EndPoint

router.post('/register', userContorller.userRegister)

router.post('/login', userContorller.userLogin)

module.exports = router