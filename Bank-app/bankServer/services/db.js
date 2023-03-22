//Import mongoose in db.js file
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

//Using mongoose define connection string
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('MongoDB connected successfully');
})

//Create model for the project(collection)
//model - users

const User = mongoose.model('User',{
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]
})

//export model
module.exports={
    User
}