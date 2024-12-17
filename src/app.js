const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const User = require("./models/Users");
const app = express();
const authRouter = require("./routes/auth") 
const profileRouter = require("./routes/profile") 
const requestRouter = require("./routes/request")


// Middleware
app.use(express.json());
app.use(cookieParser());
// Routes
 

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter )

// Connect to DB and Start Server
connectDB().then(() => {
    app.listen(4000, () => console.log(`Server running on port ${4000}`));
});
