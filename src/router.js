const router = require('express').Router()
const userController = require('./controllers/userController')
const { authenticate } = require('./middlewares/auth')

router.post('/user', userController.register)
router.put('/user', userController.login)
router.get('/user', authenticate, userController.profile)
router.put('/topup', authenticate, userController.topUp)
router.put('/transfer/:id', authenticate, userController.transfer)

module.exports = router