const express = require("express")


const { userAuth } = require("../middlewares/auth");

 const requestRouter = express.Router()


 const connectionRequest= require("../models/connectionRequest")

 requestRouter.post("/request/send/interested/:toUserId", userAuth,async(req, res) => {



    try{
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;


            const connetionRequest = new connectionRequestModel({
                fromUserId,

                toUserId,
                status,
            });
            

            const data = await connectionRequest.save()



            res.json({
                message:"Connection request sent succesfully",
                data,
            })




    }

    catch(err){
        res.status(400).send("error"+err.message)
    }
 });
 

 module.exports=requestRouter