const express = require('express');

const app = express()
const port = process.env.PORT || 9000;
const path = require('path');
const pathToReactBuild = path.join(__dirname,'..', 'build')

//import env vars in local
if(!process.env.NODE_ENV) require('dotenv').config()
//import db
require('./db/mongoose')

//middleware
app.use(express.json())
app.use((req, res, next) => {
    //allow the request to come from any endpoint
    console.log("request methods: ",req.method);
    console.log("req.originalUrl",req.originalUrl);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})
//routes

const usersRouter = require('./routers/users');
const otherRouter = require('./routers/other');

app.use(usersRouter);
app.use(otherRouter);

//serve assets for frontend
app.use(express.static(pathToReactBuild));

//serve react app
app.get('*', (req,res, next)=>{
    res.sendFile(path.join(pathToReactBuild, 'index.html'))
})

app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`);
})
