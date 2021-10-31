const mongoose = require('mongoose');


const connectDB = async() => {
    return await mongoose.connect('mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/ejsSession').then((res) => {
        console.log("connected");
    }).catch((err) => {
        console.log("fail to connect DB ", err);
    })
}


module.exports = connectDB;