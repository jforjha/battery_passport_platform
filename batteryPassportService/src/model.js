const mongoose = require("mongoose");

const PassportSchema = new mongoose.Schema({
  data: Object,
});

module.exports = mongoose.model("Passport", PassportSchema);