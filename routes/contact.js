const express = require("express")
const router = express.Router()
const contact  = require("../models/contact")
const auth = require("./auth")

router.post("/contact",auth,async (req,res)=>{
    try {
        contact.find({email:req.body}).then((data)=>{
            if(data.length){
                res.status(400).send("Contact alraedy exists")
            }else{
                contact.create({
                    name:req.body.name,
                    email:req.body.email,
                    phoneNumber:req.body.phoneNumber
                }).then((userData)=>{
                    res.status(200).send({userData})
                }).catch((err)=>{res.status(400).send(err)})
            }
        }).catch((err)=>{res.status(400).send(err)})
    } catch (err) {
        console.log(err);
    }
})

router.get("/mycontacts",auth,async (req,res)=>{
    try {
        contact.find({name:req.body.name}).then((data)=>{
            res.status(200).json({data})
        }).catch((err)=>{res.status(400).send(err)})
    } catch (err) {
        console.log(err);
    }
})


router.get("/contact/:id", auth, async (req, res) => {
    const { id } = req.params;
  
    if (!id) return 
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "please enter a valid id" });
  
    try {
    Contact.findOne({ name : req.params.name }).then((data)=>{
        if(!data.length){
            res.status(400).json({ error: "no name specified." });
        }else{
            res.status(200).json({ data});
        }
    }).catch((err)=>{
        res.status(400).json(err);
    })
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router