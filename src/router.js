const router = require('express').Router()
const userController = require('./controllers/userController')

router.put('/user', userController.login)

module.exports = router