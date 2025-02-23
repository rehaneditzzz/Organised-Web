const TeacherAdd = require("../Models/NewTeacher");

// Add a new teacher
exports.addTeacher = async (req, res) => {
  try {
    const teacher = new TeacherAdd(req.body);
    await teacher.save();
    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (error) {
    res.status(400).json({
      message: "Error adding teacher",
      error: error.message,
    });
  }
};

// Get all teachers (No Search)
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherAdd.find(); // Fetch all teachers
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching teachers",
      error: error.message,
    });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await TeacherAdd.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error: error.message });
  }
};