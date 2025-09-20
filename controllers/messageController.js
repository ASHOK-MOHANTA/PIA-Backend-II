const Message = require("../models/message_model");

exports.getMessage = async (req,res) =>{
    try {
        const message = await Message.find().sort({createdAt:-1}).limit(50).populate("author","username");
        res.json(message.reverse());
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}