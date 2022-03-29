const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  streetName: String,
  streetNumber: String,
  postCode: String,
  city: String,
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
