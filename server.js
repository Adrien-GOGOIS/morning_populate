const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Import modèles mongoose:
const Student = require("./models/studentModel");
const Address = require("./models/addressModel");

app.use(express.json());

// Connection DB
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

// Post
app.post("/students", async (req, res) => {
  // Instance d'Address
  const address1 = new Address({
    streetName: req.body.address.streetName,
    streetNumber: req.body.address.streetNumber,
    postCode: req.body.address.postCode,
    city: req.body.address.city,
  });

  // Injection de l'adresse dans un nouvel étudiant
  try {
    await address1.save(function (err) {
      const student1 = new Student({
        firstName: req.body.firstName,
        surname: req.body.surname,
        address: address1._id,
      });

      // Sauvegarde
      student1.save((err) => {
        console.log(err);
      });

      res.status(201).json({
        message: "Etudiant ajouté",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error happened",
    });
  }
});

// GET des étudiants avec populate pour l'adresse
app.get("/students", async (req, res) => {
  const student = await Student.find().populate("address").select("-__v");
  res.json(student);
});

app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate("address")
    .select("-__v");
  res.json(student);
});

app.listen(8000, () => {
  console.log("LISTEN ON PORT 8000");
});
