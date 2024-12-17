const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: [true, "First name is required!"] },
        lastName: { type: String },
        emailId: {
            type: String,
            lowercase: true,
            required: [true, "Email address is required!"],
            unique: true,
            trim: true,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: (props) => `Invalid email address: ${props.value}`,
            },
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter a stronger password.");
                }
            },  },
        age: { type: Number, min: [18, "Age must be at least 18!"] },
        gender: {
            type: String,
            required: [true, "Gender is required!"],
            enum: ["male", "female", "others"],
        },
        photoURL: {
            type: String,
            default:
                "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo= ",
        },
        about: { type: String, default: "This is the default about the user." },
        skills: {
            type: [String],
            validate: {
                validator: (v) => v.length <= 7,
                message: "You can only have up to 7 skills.",
            },
            default: [],
        },
    },
    { timestamps: true }
);

// Generate JWT
userSchema.methods.getJWT = function () {
    return JWT.sign({ _id: this._id }, "Dev@NamasteNode", { expiresIn: "7d" });
};

// Validate Password
userSchema.methods.validatePassword = function (passwordInput) {
    return bcrypt.compare(passwordInput, this.password);
};

module.exports = mongoose.model("User", userSchema);
