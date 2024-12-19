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
const validateEditProfileData = (req) => {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoURL",
      "gender",
      "age",
      "about",
      "skills",
    ];
  
    // Check for invalid fields
    const invalidFields = Object.keys(req.body).filter(
      (field) => !allowedEditFields.includes(field)
    );
  
    if (invalidFields.length > 0) {
      return {
        isValid: false,
        message: "Invalid fields in request",
        invalidFields,
      };
    }
  
    return { isValid: true };
  };
  
  module.exports = { validateEditProfileData };
  
module.exports={
    validateEditProfileData,
    validateSignUpData
}