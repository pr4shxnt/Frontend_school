import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentsListing from './StudentsListing';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [formData, setFormData] = useState({
    roll_no: '',
    name: '',
    age: '',
    standard: '',
    section: '',
    app_no: '',
    address: '',
    phone_no: '',
    admit_date: '',
    grad_date: '',
    dob: '', // Added DOB field
    image: null,
  });

  // Fetch the student list when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/students`);
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };
    fetchStudents();
  }, []);

  // Handle form changes for both create and update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (editStudent) {
        // Update the existing student
        await axios.put(`${import.meta.env.VITE_BACKEND_API_URI}/api/students/update/${editStudent._id}`, formDataToSend);
      } else {
        // Create a new student
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URI}/api/students/create`, formDataToSend);
      }
      // Close modal after submission
      setModalOpen(false);
      setEditModalOpen(false);
      setEditStudent(null);
      setFormData({
        roll_no: '',
        name: '',
        age: '',
        standard: '',
        section: '',
        app_no: '',
        address: '',
        phone_no: '',
        admit_date: '',
        grad_date: '',
        dob: '', // Reset DOB
        image: null,
      });
      // Refetch the students list
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/students`);
      setStudents(response.data);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setFormData({
      roll_no: student.roll_no,
      name: student.name,
      age: student.age,
      standard: student.standard,
      section: student.section,
      app_no: student.app_no,
      address: student.address,
      phone_no: student.phone_no,
      admit_date: student.admit_date,
      grad_date: student.grad_date,
      image: null,
    });
    setEditModalOpen(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API_URI}/api/students/${studentToDelete._id}`);
      const updatedStudents = students.filter((student) => student._id !== studentToDelete._id);
      setStudents(updatedStudents);
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Student Management</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 mb-6"
      >
        Add Student
      </button>

      {/* Modal for Creating Student */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Roll No:</label>
                  <input
                    type="number"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Date of Birth:</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Standard:</label>
                  <input
                    type="text"
                    name="standard"
                    value={formData.standard}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Section:</label>
                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">App No:</label>
                  <input
                    type="number"
                    name="app_no"
                    value={formData.app_no}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone No:</label>
                  <input
                    type="number"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Admit Date:</label>
                  <input
                    type="date"
                    name="admit_date"
                    value={formData.admit_date}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Grad Date:</label>
                  <input
                    type="date"
                    name="grad_date"
                    value={formData.grad_date}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Image:</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
                >
                  Add Student
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Edit Student */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Roll No:</label>
                  <input
                    type="number"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Standard:</label>
                  <input
                    type="text"
                    name="standard"
                    value={formData.standard}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Section:</label>
                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone No:</label>
                  <input
                    type="number"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Image:</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Delete Student</h2>
            <p>Are you sure you want to delete this student?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student List */}
<StudentsListing students={students}/>
      <div className="student-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <div key={student._id} className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src={`${import.meta.env.VITE_BACKEND_API_URI}${student.image}`}
              alt={student.name}
              className="w-24 h-24 object-cover mx-auto mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-center text-sm">Roll No: {student.roll_no}</p>
            <p className="text-center text-sm">DOB:  {new Date(student.dob).toLocaleDateString("en-CA")}</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => handleEdit(student)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminStudents;
