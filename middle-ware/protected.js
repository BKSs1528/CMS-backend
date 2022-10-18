const express = require("express")
const jwt = require("jsonwebtoken")
const contactModel = require("../models/contactSchema")
const dotenv = require("dotenv")
dotenv.config()
const secret_key = process.env.secret_key;
console.log(secret_key,44456);

// const router = express.Router()

module.exports =(req,res,next)=>{
    const authHeader = req.headers.authorization
    console.log(authHeader);
    if(authHeader){
        try {
            let email = jwt.verify(authHeader,secret_key)
            // console.log(email)
            contactModel.findOne({email:email}).then((data)=>{
                if(data){
                    // console.log(data);
                    res.status(200).send(data)
                }else{
                    res.status(400).send("Data not found")   
                }
            }).catch((err)=>{
                res.status(400).send(err)
            })
        } catch (err) {
            res.status(500).send(err)
            console.log(err);
        }
    }else{
        res.status(400).json({error:"Forbidden"}) 
    }
}