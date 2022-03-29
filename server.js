const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://adrien:supermotdepasse@cluster0.sjoau.mongodb.net/morning-populate?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to Database");
  });

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(8000, () => {
  console.log("LISTEN ON PORT 8000");
});
