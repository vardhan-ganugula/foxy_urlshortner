const express = require('express')

const authRouter = express.Router()

const {handleCreateUser, handleSignIn, handleForgotPassword,handleResetPassword} = require('../controllers/auth')



authRouter.post('/create', handleCreateUser)
authRouter.post('/login', handleSignIn)
authRouter.post('/forgot-password', handleForgotPassword)
authRouter.post('/reset-password/:id', handleResetPassword)




module.exports = authRouter