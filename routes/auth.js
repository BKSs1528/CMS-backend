const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const contactModel = require("../models/contactSchema")
const router = express.Router()
const salt = 10
dotenv.config();
const auth = require("../middle-ware/protected")


const secret_key = process.env.secret_key

// register
router.post("/reg",async (req,res)=>{
    contactModel.find({email:req.body.email})
    .then((contactData)=>{
        if(contactData.length){
            console.log(1);
            res.status(400).send("user contact details already exist")
        }else{
            console.log(2);
            bcrypt.genSalt(salt).then((saltHash)=>{
                console.log(3,saltHash);
                bcrypt.hash(req.body.password,saltHash).then((hashedPassword)=>{
                    console.log(4,hashedPassword);
                    contactModel.create({
                        name :req.body.name,
                        email:req.body.email,
                        phoneNumber:req.body.phoneNumber,
                        password:hashedPassword
                    })
                    .then((data)=>{
                        console.log(5,typeof(data),data);
                        res.status(200).send(data)
                    }).catch((err)=>{
                        console.log(6);
                        res.status(400).send(err)
                    })
                }).catch((e)=>{res.status(400).send(e)})
            }).catch((e)=>{res.status(400).send(e)})
        }
    })
    .catch((err)=>{console.log(9),res.status(400).send(err)})
})



// login
router.post("/login",async (req,res)=>{
    contactModel.find({email:req.body.email}).then((data)=>{
        if(data.length){
            bcrypt.compare(req.body.password,data[0].password).then((val)=>{
                console.log(val);
                if(val){
                    const token = jwt.sign(data[0].email,secret_key)   //crypto.randomBytes(64).toString("hex")
                    const user = {...data._doc,password:undefined}
                    console.log(user);
                    res.status(200).send({token,user});
                }
                else{
                    console.log(1);
                    res.status(400).send("Invalid Password");
                }
            })
        }else{
            console.log(2);
            res.send(400).json("Invalid Password");
        }
    }).catch((err)=>{res.status(400).send(err)})
})

// logout
router.get("/me",auth,async (req,res)=>{
    console.log(user);
    return res.status(200).json({...req.user})
})

module.exports= router;

