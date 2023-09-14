const express = require('express')
const {signUp,login,authenticate,auth,deposit,withdraw,logout,history} = require('../controller/authController')

const router = express.Router()

router.post('/login',login)
router.get('/login',auth)
router.post('/deposit',deposit)
router.post('/withdraw',withdraw)
router.get('/history',history)
router.post('/logout',logout)

module.exports = router