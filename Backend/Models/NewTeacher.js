const mongoose = require("mongoose");

const NewTeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, enum: ["math", "science", "english", "history"], required: true },
  department: { type: String, enum: ["arts", "science", "commerce"], required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
});

module.exports = mongoose.model("NewTeacher", NewTeacherSchema);
