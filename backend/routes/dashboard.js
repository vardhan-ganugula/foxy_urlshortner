const express = require('express');
const dashboardRouter = express.Router();
const {handleAnalytics} = require('../controllers/url')
const {handleHome,getAllUrls} = require('../controllers/dashboard')

const {validateUser} = require('../middlewares/dashboard')




dashboardRouter.post('/', handleHome);


dashboardRouter.get('/get-links', getAllUrls);


dashboardRouter.post('/analytics/:id', handleAnalytics)

module.exports=dashboardRouter;