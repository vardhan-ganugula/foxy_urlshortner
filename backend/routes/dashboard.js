const express = require('express');
const dashboardRouter = express.Router();
const {handleAnalytics, handleCreateURL} = require('../controllers/url')
const {handleHome,handleCreteURL} = require('../controllers/dashboard')

const {validateUser} = require('../middlewares/dashboard')




dashboardRouter.get('/',validateUser, handleHome);
dashboardRouter.post('/create_url', validateUser, handleCreteURL)




dashboardRouter.post('/analytics/:id', handleAnalytics)

module.exports=dashboardRouter;