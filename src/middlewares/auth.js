const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const userAuth= async (req,res,next)=>{
try{
    //  read the token 
    const{token}=req.cookies;
    if(!token){
        throw new Error("Invalid token !!!")
    }

    const decodedObj = await jwt.verify(token,"Dev@NamasteNode")

    // validate the token
    const {_id} = decodedObj;
    //find the user 
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found")
    }
    req.user = user;    
    next();
}
catch(err){
    res.status(404).send("Error" +err.message)
}

} 


module.exports  = {
    userAuth
};