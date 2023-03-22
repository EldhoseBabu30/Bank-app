//import db.js
const db = require('./db')
//import jsonwebtoken
const jwt = require('jsonwebtoken')

//register 
const register=(uname,acno,pswd)=>{
    console.log('Inside register function in data service');
    //asynchronous
    //check acno is in mongoDb - db.users.findOne()
    return db.User.findOne({
        acno
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                 statusCode:403,
                 message:'Account already exist!!'
            }
        }
        else{
            //to add new user
            const newUser = new db.User({
                username:uname,
                acno,
                password:pswd,
                balance:0,
                transaction:[]
            })
            //to save new user in mongoDb use save()
            newUser.save()
            return {
                statusCode:200,
                message:'Registration successfull...'
            }
        }
    }
    )

}
//login
const login = (acno,pswd)=>{
    console.log('Inside login function body');
    //check acno,pswd in mongodb
    return db.User.findOne({
        acno,
        password:pswd
    }).then(
        (result)=>{
            if(result){
                //generate token
                const token = jwt.sign({
                    currentAcno:acno
                },'supersecretkey123')
                return{
                    statusCode:200,
                message:'Login successfull...',
                username:result.username,
                currentAcno:acno,
                token
                }
            }
            else{
                return{
                    statusCode:404,
                 message:'Invalid account or password'

                }
                
            }

        })

}

//getBalance
const getBalance=(acno)=>{
    return db.User.findOne({
        acno
    }).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    balance:result.balance
                }
            }
            else{
                return{
                    statusCode:404,
                 message:'Invalid account'

                }

            }

        }
    )
}
//deposit
const deposit=(acno,amount)=>{
    // let amount = Number(amt)
    returndb.User.findOne({
        acno
    }).then((result)=>{
        if(result){
            //acno is present db
            result.balance+=amount
            result.save()
            return{
                statusCode:200,
                message:'${amount} successfully deposited...'
            }
        }
        else{
            return{
                statusCode:404,
             message:'Invalid account'

            }

        }
    })
    

}

//export
module.exports={
    register,
    login,
    getBalance,
    deposit
}