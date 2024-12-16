 const validator = require('validator')
 

 const validateSignUpData = (req)=>{
    const {firstName, lastName , emailId , password} =req.body

if(!firstName || !lastName){
    throw new Error("Name entered is invalid")
    

}
// else if(firstName.length<4 && firstName.length>20){
//     throw new Error("first name should be  4-50 characters")
// }
 

else if(!validator.isEmail(emailId)){
    throw new Error("Email not valid")
}
else if(!validator.isStrongPassword(password)){
    throw new Error(" please enter a  Strong Password!")
}


}
module.exports={
    validateSignUpData
}