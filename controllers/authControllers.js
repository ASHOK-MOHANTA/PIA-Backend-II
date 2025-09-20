const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

exports.register = async (req,res) =>{
    try {
        const {username,password} = req.body;
        const user = await User.create({username,password});
        res.status(201).json({message:"User Created"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

exports.login = async (req,res) =>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid Credentials"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"id"});
        res.json({token});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};