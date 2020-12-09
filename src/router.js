const router = require('express').Router()
const userController = require('./controllers/userController')
const { authenticate } = require('./middlewares/auth')

router.put('/user', userController.login)
router.put('/topup', authenticate, userController.topUp)
router.put('/transfer/:id', authenticate, userController.transfer)

module.exports = router