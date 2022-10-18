const mongoose = require("mongoose")

const connectDb = async ()=>{
    return mongoose.connect("mongodb://localhost:27017/contactDB")
    .then(()=>{console.log(`Connected to db`);})
    .catch((err)=>{console.log(err);})
}

module.exports = connectDb;