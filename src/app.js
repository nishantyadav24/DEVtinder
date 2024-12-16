const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/Users");
const {validateSignUpData} = require("./utils/Validation")
const app = express();
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

// Middleware
app.use(express.json());

app.use(cookieParser());
// Signup Route
app.post("/signup", async (req, res) => {
 
    ///creating a instance of  the User Model 
    try {
        
        //validate the data
        validateSignUpData(req);
        const {firstName,lastName,emailId,password,gender} = req.body;
        //encrypt the password 
// the bcrypt uses salt and the plaiin passwrd and swivels the password multiple times in rounds so that the password cant eb decrtyopterd
        const passwordHash =  await bcrypt.hash(password,10);

        


        //creating a new instance of model
        
        const user = new User(
            {
                firstName,
                lastName,
                emailId,
                gender,
                password:passwordHash
            }
        );
        await user.save();
        res.send("User saved successfully");
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send("Email already exists");
        }
        res.status(400).send("Validation error: " + error.message);
    }
});
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Find user by email
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("InValid credentials");
        }

        // Compare plaintext password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {

            //create a jwt token 
            const token = await jwt.sign({_id:user._id},"Dev@NamasteNode",{
                expiresIn:"0d",

            })


            res.cookie("token",token,{httpOnly:true})
          
            res.send("User login successful");
        } else {
            throw new Error("Password is not correct");
        }
    } catch (err) {
        res.status(404).send("Login error: " + err.message);
    }
});


app.get("/profile",userAuth,async (req,res)=>{
 try{   

     const user = req.user;

            res.send(user)}
            catch(error){
                res.status(400).send("something went wrong")
            }
     
})
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user
    //send a connection request
    console.log("sending a connection request")
    res.send(user.firstName +"connection reqeust send")
})
// Feed Route
app.get("/feed", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (!users || users.length === 0) {
            return res.status(404).send("User not found");
        }
        res.send(users);
    } catch (error) {
        res.status(400).send("Error retrieving email ID");
    }
});

// Delete User Route
app.delete("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Update User Route
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoURL", "url", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            return res.status(400).send("Update not allowed");
        }

        const user = await User.findByIdAndUpdate(
            userId,
            data,
            { returnDocument: "after", runValidators: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Start Server
connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(4000, () => {
            console.log(`Server is running on port 4000`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });
