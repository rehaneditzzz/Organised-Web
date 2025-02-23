const StudentAdd = require("../Models/NewStudent");

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const student = new StudentAdd(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(400).json({
      message: "Error adding student",
      error: error.message,
    });
  }
};

// Get all students (No Search)
exports.getStudents = async (req, res) => {
  try {
    const students = await StudentAdd.find(); // Fetch all students
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await StudentAdd.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
};