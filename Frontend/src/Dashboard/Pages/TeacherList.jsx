import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Layout/Header";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/add-teachers/get");
        setTeachers(response.data.teachers);
        setFilteredTeachers(response.data.teachers); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching teachers:", error.message);
      }
    };
    fetchTeachers();
  }, []);

  // Search Logic in Frontend
  useEffect(() => {
    const filtered = teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [search, teachers]);




// Delete teacher
const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/add-teachers/delete-teacher/${id}`
    );
    setTeachers(teachers.filter((teacher) => teacher._id !== id));
  } catch (error) {
    console.error(
      "Error deleting teacher:",
      error.response ? error.response.data : error.message
    );
  }
};




  return (
    <div className="container mx-auto p-4 h-[70vh] overflow-y-scroll">
      <h2 className="text-xl font-semibold text-gray-800 m-4">Teacher List</h2>

      <Header onSearch={setSearch} /> {/* Search bar */}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white border-t border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map(teacher => (
              <tr key={teacher._id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-3 text-sm font-semibold text-gray-700">{teacher.name}</td>
                <td className="px-6 py-3 text-sm text-red-500">{teacher.subject}</td>
                <td className="px-6 py-3 text-sm text-blue-500">{teacher.email}</td>
                <td className="px-6 py-3 text-sm">
                <button
                    onClick={() => handleDelete(teacher._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTeachers.length === 0 && <div className="text-center p-4 text-gray-500">No teachers found.</div>}
      </div>
    </div>
  );
};

export default TeacherList;