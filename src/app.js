const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// app.use('/admin',adminAuth)
// app.use('/admin',userAuth )
//     (req,res)=>{
//     //request handler 
//     console.log("handling second route")

//     res.send("route handler 2  ")
// })
    // next();
// },
//     (req,res)=>{
//     //request handler 

//     // res.send("route handler 1  ")
// },
//     (req,res)=>{
//     //request handler 

//     // res.send("route handler 1  ")
// },
//     (req,res)=>{
//     //request handler 

//     // res.send("route handler 1  ")
// })
//order of wrinting the routes matter a lot

app.get('/user/admin/getAllData',
(req,res)=>{
    //request handler 
   

    res.send("all data sent ")})
app.get('/user/admin/deleteUser',
(req,res)=>{
    //check first if the request is sautodrized
    console.log("handling delete route")

    res.send("route handler 3 ")})
app.get('/user/admin/SaveAllData',
(req,res)=>{
    //request handler 
    console.log("handling daata save route")

    res.send("route handler 3 ")})
//wildcard error handling
    app.use('/',(error,req,res,next)=>{
        if(error){
            res.status(500).send("somethingn went wrong ")
        }
    })
// app.get("/getUserData",(req,res)=>{
//     try{
//         //logic of db call 

//          throw new Error("sdasda")
//     } 
//     catch(error){
//         res.status(500).send("contact unable to restablish  ")
//     }
// })

app.listen(3000,()=>{
    console.log("server is sucessfully listening on this port  ")
})