const mongoose = require('mongoose')
const connectDB = async ()=>{

await mongoose.connect(
    "mongodb+srv://nishant:j9SCzfqcZCSWHv9N@cluster0.ot8ey.mongodb.net/DEVtinder?retryWrites=true&w=majority&appName=Cluster0"
)}
module.exports = connectDB