const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required!']
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            lowercase: true,
            required: [true, 'Email address is required!'],
            unique: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return validator.isEmail(value); // Using validator.js to validate email
                },
                message: props => `Invalid email address: ${props.value}`
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter a strong Password"+value)
                }
            }
        },
        age: {
            type: Number,
            min: [18, 'Age must be at least 18!']
        },
        gender: {
            type: String,
            required: [true, 'Gender is required!'],
            enum: {
                values: ['male', 'female', 'others'],
                message: 'Gender must be male, female, or others.'
            }
        },
        photoURL: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoUW8PNXbnu93pcCRUCJYbkO4fVfdBtlmzHA&s"
        },
        about: {
            type: String,
            default: "This is the default about the user."
        },
        skills: {
            type: [String],
            validate: {
                validator: function (v) {
                    return v.length <= 7; // Array must have 7 or fewer items
                },
                message: 'You can only have up to 7 skills.'
            },
            required: [true, 'Skills are required!'],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
