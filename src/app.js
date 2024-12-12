const express = require("express");

const connectDB  = require("./config/database")
const User = require("./models/Users");
// const Users = require("./models/Users");
const app = express();
// i need a middleware now 
app.use(express.json())
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
    // console.log(req.body)
    const user = new User(req.body)
    await user.save()
    res.send("Request recieved new   User  saved")
    // res.send("user added succesfully")
    
});
//feed get all the users from, the databse
app.get('/feed',async (req,res)=>{//read the request
    // const alluser = req.body;
    const userEmail = req.body.emailID;
    try{
        // const users= await User.find({})
        const users= await User.find({emailID:userEmail})
        if(!user){
            res.status(404).send("user not found")
        }
        else{
        res.send(users)
        }
// if(users.length===0){
//     res.status(404).send("User not found")}
    // else{
    //     res.send(users)
    // }
}
    
    catch(error){
        res.status(400).send("Email id cannt be pulled")
    }

})


//delete request

 //<Model.FindbyIdandDelete
 app.delete("/user", async(req,res)=>{
    const userId= req.body.userId;
    try{

        const user =  await User.findByIdAndDelete(userId)
        res.send("user deleted succesfully")
    }
    catch (err){
        res.status(400).send("Something went wrong")
    
 }
})
//update request
 app.patch("/user", async (req,res)=>{
    const userId = req.body.userId;
    const data= req.body;
    try{

         const user =await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before"});
         console.log(user); 
        res.send("user updated succesfully")
    }
    catch (err){
        res.status(400).send("Something went wrong")
    
 }
}
 )
connectDB().then(()=>{
    console.log("database connected succesfuly ")
     app.listen(4000, () => {
        console.log(`Server is running on port ${4000}`);
    });
   }).catch((err)=>{
   console.error("database  cannot be connected")
   })



