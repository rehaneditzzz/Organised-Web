const mongoose = require("mongoose");

const UnderGraduateSchema = new mongoose.Schema({
  image: { type: String, required: true }, 
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("UnderGraduate", UnderGraduateSchema);
