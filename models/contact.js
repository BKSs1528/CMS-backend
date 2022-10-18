const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name:{type: String,required :true},
    email:{type:String,required:true},
    phoneNumber:{type:Number,required:true}
})

 const contact = new mongoose.model("userData",contactSchema)


module.exports = contact;