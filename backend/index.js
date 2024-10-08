const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//  custom routers
const urlForward = require('./routes/urlForward')
const dashboardRouter = require('./routes/dashboard')
const authRouter = require('./routes/auth')


const mongoConnection = require('./connection');
const useragent = require('express-useragent');

const cors = require('cors');
// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(useragent.express());

// database connection

mongoConnection(process.env.MONGO_URL).then(e=>{
  console.log('connection success')
}).catch(err=>{
  console.log('connection failed ' + err)
});

// urls 

app.use('/dashboard/', dashboardRouter);
app.use('/auth/', authRouter);
app.use('/', urlForward);

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`server is running at http://localhost:${process.env.PORT || 3000}`)
})