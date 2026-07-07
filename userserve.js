require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./usertodo");

const app = express();

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

app.post('/send_user',async(req,res)=>{
    const {username} = req.body
    const {email} = req.body
    const {password} = req.body
    try{
        const newData = new UserSchema({username,email,password})
        await newData.save()
        return res.json({"message":"data sended"})
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/get_all_users',async(req,res)=>{
    try{
        const allData = await UserSchema.find()
        return res.json(allData)
    }
    catch(err){
        console.log(err.message)
    }
})
app.get('/get_user/:id',async(req,res)=>{
    try{
        const Data=await UserSchema.findById(req.params.id);
        return res.json(Data)
    }
    catch(err){
        console.log(err.message)
    }
})
app.put('/update_user/:id',async(req,res)=>{
    const {username}=req.body
    const {email}=req.body
    const {password} = req.body
    try{
        await UserSchema.findByIdAndUpdate(req.params.id,{username,email,password})
        return res.json({
            message:"user was updated"
        })
    }
    catch(err){
        console.log(err.message)
    }
})


app.delete("/delete/:id1/:id2",async(req,res)=>{
    try{
        await UserSchema.findByIdAndDelete(req.params.id1);
        await UserSchema.findByIdAndDelete(req.params.id2);
        return res.json({
            message:"user deleted"
        })
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server Running on http://localhost:3000");
});
