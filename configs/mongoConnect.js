const mongoose = require("mongoose");

const conntectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Conntected");
    } catch (error) {
        console.log("Error in DB conntection");
        console.error(error);

    }
    
}

module.exports = conntectDB;