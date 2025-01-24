import React, { useState } from 'react';
import axios from 'axios';

const StudentCardAccess = () => {
  const [name, setName] = useState('');
  const [appNo, setAppNo] = useState('');  // Changed dob to app_no
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/students`); // Replace with your API endpoint
      const students = response.data;

      const student = students.find(
        (student) =>
          student.name === name && student.app_no === parseInt(appNo) // Matching based on app_no
      );

      if (student) {
        setStudentData(student);
        setIsModalOpen(true);
      } else {
        alert('Student not found!');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  return (
    <div className="min-h-[70vh] pt-20 md:pt-0 px-2 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Student Identity Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Application Number (App No)</label>
            <input
              type="number"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              value={appNo}
              onChange={(e) => setAppNo(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {isModalOpen && studentData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg ">
            <h3 className="header_default">Pranami  <span className="text-orange-500">Global  </span>School </h3>
            <h2 className="mt-1 text-center">Student Identity Card (Digital)</h2>

            <div className="mt-6 flex flex-col">
                <div className="flex flex-col md:flex-row gap-10">
              <img
                src={`${import.meta.env.VITE_BACKEND_API_URI}${studentData.image}`}
                alt={`${studentData.name}'s Identity`}
                className="w-32 h-32 object-cover rounded-xl mx-auto mb-4"
              />
              <div className="text-center">
              <p className="flex gap-3"><span className="text-orange-500">Name :</span> {studentData.name}</p>
              <p className="flex gap-3"><span className="text-orange-500">Roll no. :</span> {studentData.roll_no}</p>
              <p className="flex gap-3"><span className="text-orange-500">Standard :</span> {studentData.standard}-{studentData.section}</p>
              <p className="flex gap-3"><span className="text-orange-500">Application number:</span> {studentData.app_no}</p> {/* Display app_no */}
              <p className="flex gap-3"><span className="text-orange-500">ID expiry date:</span> {new Date(studentData.grad_date).toLocaleDateString()}</p></div></div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCardAccess;
