const  adminAuth = (req,res,next)=>{
     console.log(" admin auth is  getting checked ")
     const  token =  "czxvasdfvasdva";
     const isAdminAuthorised = token ==="xyz " 
     if(isAdminAuthorised){
 res.send("all data send")
     }
     else{
         res.status(401).send("unauthorized");  
}
}

const  userAuth = (req,res,next)=>{
     console.log(" admin auth is  getting checked ")
     const  token =  "czxvasdfvasdva";
     const isUser = token ==="xyz " 
     if(isUser){
 res.send("all data send")
     }
     else{
         res.status(401).send("unauthorized");  
}





}


module.exports = {

    adminAuth,
    userAuth
}