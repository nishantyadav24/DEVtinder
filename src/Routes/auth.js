const express = require("express")
const { userAuth } = require("../middlewares/auth");
const User = require("../models/Users");
const bcrypt = require("bcrypt")
const {validateSignUpData} = require("../utils/Validation")
const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password, gender } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            gender,
        });

        await user.save();
        res.send("User saved successfully");
    } catch (error) {
        if (error.code === 11000) return res.status(400).send("Email already exists");
        res.status(400).send("Validation error: " + error.message);
    }
});



authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid credentials");

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) throw new Error("Incorrect password");

        const token = user.getJWT();
        res.cookie("token", token, { httpOnly: true });
        res.send("User login successful");
    } catch (error) {
        res.status(401).send("Login error: " + error.message);
    }
});
authRouter.post("/logout", (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie("token"); // Replace 'token' with your cookie name
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error during logout", error });
    }
  });
  
  
  
module.exports = authRouter