const express = require("express");

const app = express();

app.use('/hit',(req,res)=>{

    res.send("Helloo from the server ")
})

app.listen(3000,()=>{
    console.log("server is sucessfully listening on this port  ")
})