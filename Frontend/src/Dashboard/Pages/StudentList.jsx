import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Layout/Header";

const StudList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://organised-web-backend.onrender.com/api/add-student/get");
        setStudents(response.data.students);
        setFilteredStudents(response.data.students); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };
    fetchStudents();
  }, []);

  // Search Logic in Frontend
  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [search, students]);





 // Delete student
 const handleDelete = async (id) => {
  try {
    await axios.delete(
      `https://organised-web-backend.onrender.com/api/add-student/delete-student/${id}`
    );
    setStudents(students.filter((student) => student._id !== id));
  } catch (error) {
    console.error(
      "Error deleting student:",
      error.response ? error.response.data : error.message
    );
  }
};







  return (
    <div className="container mx-auto p-4 h-[70vh] overflow-y-scroll">
      <h2 className="text-xl font-semibold text-gray-800 m-4">Student List</h2>
      
      <Header onSearch={setSearch} /> {/* Search bar */}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white border-t border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Course</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Year</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-3 text-sm font-semibold text-gray-700">{student.name}</td>
                <td className="px-6 py-3 text-sm text-red-500">{student.course}</td>
                <td className="px-6 py-3 text-sm text-green-600">{student.year}</td>
                <td className="px-6 py-3 text-sm text-blue-500">{student.email}</td>
                <td className="px-6 py-3 text-sm">
                <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && <div className="text-center p-4 text-gray-500">No students found.</div>}
      </div>
    </div>
  );
};

export default StudList;
