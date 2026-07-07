require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const TodoSchema = require("./todo");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

app.post('/add_todo',async(req,res)=>{
    const {title} = req.body
    const {description} = req.body
    const {completed} = req.body
    try{
        const newData = new TodoSchema({title,description,completed})
        await newData.save()
        return res.json({"message":"data sended"})
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/get_all_todos',async(req,res)=>{
    try{
        const allData = await TodoSchema.find()
        return res.json(allData)
    }
    catch(err){
        console.log(err.message)
    }
})
app.get('/get_todo/:id',async(req,res)=>{
    try{
        const Data=await TodoSchema.findById(req.params.id);
        return res.json(Data)
    }
    catch(err){
        console.log(err.message)
    }
})
app.put('/update_todo/:id',async(req,res)=>{
    const {title}=req.body
    const {description}=req.body
    const {completed} = req.body
    try{
        await TodoSchema.findByIdAndUpdate(req.params.id,{title,description,completed})
        return res.json({
            message:"todo was updated"
        })
    }
    catch(err){
        console.log(err.message)
    }
})


app.delete("/delete_id1/:id2",async(req,res)=>{
    try{
        await TodoSchema.findByIdAndDelete(req.params.id1);
        await TodoSchema.findByIdAndDelete(req.params.id2);
        return res.json({
            message:"todo deleted"
        })
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(PORT, () => {
  console.log(`🚀 Server Running on port ${PORT}`);
});
