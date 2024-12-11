const mongoose = require('mongoose');
const userSchema  = mongoose.Schema(
    {
        first_name:{
            type:String
        },
        lastName:{
            type:String

        },
        emailId:{
            type:String
        },
        password:{
            type:String
        },
        age:{
            type:Number
        },
        gender:{
            type:String
        }
    }
);


module.exports = mongoose.model("User",userSchema)