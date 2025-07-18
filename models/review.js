const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const User=require("./user.js");

const reviewSchema = new Schema({
    comment:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        maax:5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports=mongoose.model("Review",reviewSchema);