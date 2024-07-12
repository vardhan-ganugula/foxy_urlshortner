const express = require('express');
const dashboardRouter = express.Router();
const {handleAnalytics} = require('../controllers/url')


dashboardRouter.get('/', (req, res)=>{
    res.send('working')
})

dashboardRouter.get('/analytics/:id', handleAnalytics)


module.exports=dashboardRouter;