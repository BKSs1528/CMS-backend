const express = require("express")
const morgan = require("morgan")
const app = express()
const connectDb =require("./config/db")



// middle-ware
app.use(express.json())
app.use(morgan("tiny"))
app.use(require("cors")())


// routes
app.get(("/"),(req,res)=>{console.log("hello world"); res.send("hello world")})


// server configurations
const port = process.env.port || 8000
app.listen(port, async ()=>{
    try {
        await connectDb();
        console.log(`server sunning on ${port}`);
    } catch (err) {
        console.log(err);
    }
})


app.get("/protected",require("./middle-ware/protected"),(req,res)=>{
    return res.status(200).json({contact:req.contact})
})
app.use("/api",require("./routes/auth"))
app.use("/api",require("./routes/contact"))