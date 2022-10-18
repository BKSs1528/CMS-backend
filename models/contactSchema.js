const mongoose = require("mongoose")


const contactSchema = new mongoose.Schema({
    name:{type : String,required:true},
    email:{type : String,required:true},
    phoneNumber:{type : Number,required:true},
    password:{type : String,required:true,minlength:7}
})


const contactModel= new mongoose.model("contactData",contactSchema)

module.exports = contactModel;