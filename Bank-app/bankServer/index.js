

//import express inside index.js
const express = require('express')

//import cors in index.js
const cors = require('cors')

//import dataService
const dataService = require('./services/dataService')

//import jsonwebtoken
const jwt = require('jsonwebtoken')

//Create server app using express
const server = express()

//use cors to define origin
server.use(cors({
    origin:'http://localhost:4200'
}))

//to parse json data
server.use(express.json())

//Setup port for server app
server.listen(3000,()=>{
    console.log('Server started at 3000');
})

//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('Inside application specific middleware');
    next()
}
server.use(appMiddleware)
//bankapp front end and request resolving

//token verify middleware

const jwtMiddleware=(req,res,next)=>{
    console.log('Inside router specific middleware');
    //get token from req headers
    const token = req.headers['access-token']
    console.log(token);
   try {//verify token
    const data=jwt.verify(token,'supersecretkey123')
    console.log('Valid token');
    next()
}
   catch{
    console.log('Invalid token');
    res.status(401).json({
        message:'Please Login!!'
    })


    }
   
}
 //register api callresolving
server.post('/register',(req,res)=>{
    console.log('Inside register Api');
    console.log(req.body);
    //asynchronous
    dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    

})
 //login api callresolving
 server.post('/login',(req,res)=>{
    console.log('Inside Login Api');
    console.log(req.body);
    //asynchronous
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    

})

//get balance api
server.get('/getBalance/:acno',jwtMiddleware,(req,res)=>{
    console.log('Inside Login Api');
    console.log(req.params.acno);
    //asynchronous
    dataService.getBalance(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })

})
//deposit api
server.get('/deposit',jwtMiddleware,(req,res)=>{
    console.log('Inside deposit Api');
    console.log(req.body);
    //asynchronous
    dataService.deposit(req.body.acno,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

