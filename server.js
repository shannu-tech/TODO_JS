const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const TodoSchema = require("./todo");

const app = express();

app.use(express.json());

const MONGO_URI =
  "mongodb+srv://SHANNU:opUyvSXjFSaVLNVe@nodejs.nkun5i2.mongodb.net/?appName=NODEJS";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));


// CREATE TODO

app.post("/send_data", async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const newTodo = new TodoSchema({
      title,
      description,
      completed,
    });

    await newTodo.save();

    return res.json({
      message: "Todo Added Successfully",
      data: newTodo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});


// UPDATE TODO

app.put("/update/:id", async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const updatedTodo = await TodoSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      { new: true }
    );

    return res.json({
      message: "Todo Updated Successfully",
      data: updatedTodo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});


// GET ALL TODOS

app.get("/get_all_data", async (req, res) => {
  try {
    const allData = await TodoSchema.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});


// GET SINGLE TODO

app.get("/get_data/:id", async (req, res) => {
  try {
    const data = await TodoSchema.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});


// DELETE ONE TODO

app.delete("/delete/:id", async (req, res) => {
  try {
    await TodoSchema.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Todo Deleted Successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});


// DELETE TWO TODOS

app.delete("/delete/:id1/:id2", async (req, res) => {
  try {
    await TodoSchema.findByIdAndDelete(req.params.id1);
    await TodoSchema.findByIdAndDelete(req.params.id2);

    return res.json({
      message: "Two Todos Deleted Successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});
app.listen(3000, () => {
  console.log("🚀 Server Running on http://localhost:3000");
});


