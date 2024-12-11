const express = require("express");

const connectDB  = require("./config/database")
const User = require("./models/Users")
const app = express();
// i need a middleware now 
app.post('/signup',async (req,res)=>{
    // const userObj ={
    //     firstName:"Nishant",
    //     lastName:"Yaduvanshi",
    //     emailId:"nishant15@gmail.com",
    //     password:"coakljscbajnsblo",
    //     age:"18",
    //     gender:"female"
    // }
    // const user = new User(userObj)
    // await user.save()
    console.log(req.body)
    res.send("Request recieved")
    // res.send("user added succesfully")
    
});

connectDB().then(()=>{
    console.log("database connected succesfuly ")
     app.listen(4000, () => {
        console.log(`Server is running on port ${4000}`);
    });
   }).catch((err)=>{
   console.error("database  cannot be connected")
   })



