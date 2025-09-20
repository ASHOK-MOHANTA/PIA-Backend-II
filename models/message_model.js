const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    const :{type:String,required:true},
    author :{type:mongoose.Types.ObjectId,ref:"User",required:true},
    createdAt:{type:Date,default:Date.now},
});

module.exports = mongoose.model("Message",messageSchema)