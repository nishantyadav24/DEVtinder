const mongoose = require("mongoose")

const connectonRequestSchema = new mongoose.Schema(


    {



        fromUserId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
        },
        toUserId:{
                type:mongoose.Schema.Types.ObjectId
        },
        status:{
            type:string,
            enum:{
                values:["ignored","interested","accepted","rejected"],
                message:`{VALUE} is incorrect status type`
            }
        }

    },
    {
        timestamps:true
    }

)

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectonRequestSchema);

