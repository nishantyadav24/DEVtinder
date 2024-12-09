const express = require("express");

const app = express();

app.use('/user',
    (req,res,next)=>{
    //request handler 
    console.log("handliong first route")

    next();
    res.send("route handler 1  ")
})
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

app.use('/user',
(req,res)=>{
    //request handler 
    console.log("handling third route")

    res.send("route handler 3 ")})
app.listen(3000,()=>{
    console.log("server is sucessfully listening on this port  ")
})