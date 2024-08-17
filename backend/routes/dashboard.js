const express = require('express');
const dashboardRouter = express.Router();
const {handleAnalytics} = require('../controllers/url')
const {handleHome} = require('../controllers/dashboard')

const {validateUser} = require('../middlewares/dashboard')




dashboardRouter.get('/',validateUser, handleHome);





dashboardRouter.post('/analytics/:id', handleAnalytics)

module.exports=dashboardRouter;