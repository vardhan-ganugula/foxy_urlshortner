const express = require('express');
const dashboardRouter = express.Router();
const {handleAnalytics} = require('../controllers/url')

const {handleCreateUser, handleSignIn, handleForgotPassword,handleResetPassword} = require('../controllers/dashboard')
const {validateUser} = require('../middlewares/dashboard')


dashboardRouter.post('/create', handleCreateUser)
dashboardRouter.post('/login', handleSignIn)
dashboardRouter.post('/forgot-password', handleForgotPassword)
dashboardRouter.post('/reset-password/:id', handleResetPassword)

dashboardRouter.get('/', validateUser,(req, res)=>{
    res.send('working')
});

dashboardRouter.get('/test',validateUser,(req, res)=>{
    res.send('working')
})
dashboardRouter.get('/test-method',(req, res)=>{
    res.send('working')
})


dashboardRouter.post('/analytics/:id', handleAnalytics)


module.exports=dashboardRouter;