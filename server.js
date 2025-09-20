require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000
const authRoutes = require("./routes/authRouter");
const messageRoutes = require("./routes/messageRouter");
const Message = require("./models/message_model");
const User = require("./models/user_model");
const conntectDB = require("./configs/mongoConnect");
const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = socketio(server,{cors:{origin:"*"}});

conntectDB();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

// Socket logic

io.on("connection",(socket) =>{
    console.log("New client connected",socket.id);
    socket.on("authenticate",async (token) =>{
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(decode.id);
            if(!user) return socket.disconnect();

            socket.userId = user._id;
            socket.join("general-chat");
            console.log(`${user.username} joined general-chat`);
        } catch (error) {
            socket.disconnect();
        }
    });

    socket.on("sendMessage", async(content)=>{
        if(!socket.userId) return;

        const message = await Message.create({content, author:socket.userId});
        await message.populate("author","username");
        io.to("general-char").emit("newMessage",message);
    });
    socket.on ("disconnect",()=>{
        console.log("Client disconnected", socket.id);
    });
});

server.listen(PORT,()=>{
    console.log("Server is running at",PORT)
});
