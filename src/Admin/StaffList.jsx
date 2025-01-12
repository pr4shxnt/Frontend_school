import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XCircle } from 'lucide-react';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    standard: '',
    faculty: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editStaffId, setEditStaffId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch staff data
  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/staffs`);
      setStaff(response.data);
    } catch (error) {
      setErrorMessage('Error fetching staff data.');
      console.error('Error fetching staff data:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file)); // Image preview
  };

  // Handle form submission for adding or editing staff
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('full_name', formData.full_name);
    formDataWithImage.append('age', formData.age);
    formDataWithImage.append('standard', formData.standard);
    formDataWithImage.append('faculty', formData.faculty);
    if (formData.image) formDataWithImage.append('image', formData.image);

    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_BACKEND_API_URI}/api/staffs/${editStaffId}`, formDataWithImage);
        alert('Staff updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URI}/api/staffs/create`, formDataWithImage);
        alert('Staff added successfully');
      }
      setFormData({
        full_name: '',
        age: '',
        standard: '',
        faculty: '',
        image: null,
      });
      setImagePreview(null);
      setIsEditing(false);
      setEditStaffId(null);
      setIsModalOpen(false);
      fetchStaff();
    } catch (error) {
      setErrorMessage('Error adding/updating staff.');
      console.error('Error adding/updating staff:', error);
    }
  };

  // Handle editing staff
  const handleEdit = (staffMember) => {
    setFormData({
      full_name: staffMember.full_name,
      age: staffMember.age,
      standard: staffMember.standard,
      faculty: staffMember.faculty,
      image: null,
    });
    setIsEditing(true);
    setEditStaffId(staffMember._id);
    setIsModalOpen(true);
  };

  // Handle delete operation with confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API_URI}/api/staffs/${staffToDelete._id}`);
      fetchStaff();
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      setErrorMessage('Error deleting staff.');
      console.error('Error deleting staff:', error);
    }
  };

  // Open delete confirmation popup
  const openDeleteConfirm = (staffMember) => {
    setStaffToDelete(staffMember);
    setIsDeleteConfirmOpen(true);
  };

  // Close modals
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditStaffId(null);
    setFormData({
      full_name: '',
      age: '',
      standard: '',
      faculty: '',
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Staff Management</h1>

      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      {/* Form for creating or editing staff */}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="mb-4">

          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            placeholder='Enter full name of teacher'
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">

          <input
            type="number"
            id="age"
            name="age"
            placeholder='Enter the age of teacher'
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="standard"
            name="standard"
            placeholder='Enter the standard of the teacher'
            value={formData.standard}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">

          <input
            type="text"
            id="faculty"
            name="faculty"
            placeholder='Subject'
            value={formData.faculty}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image of teacher (1:1)</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex justify-between">

        </div>
        <button type="submit" className="bg-blue-500 text-white w-full px-4 py-2 rounded-md">
            {isEditing ? 'Update Staff' : 'Create Staff'}
          </button>
      </form>

      {/* Staff list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((staffMember) => (
          <div key={staffMember._id} className="bg-white p-4 shadow-md rounded-md">
            <img
              src={`http://localhost:5000/${staffMember.image}`}
              alt={staffMember.full_name}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold">{staffMember.full_name}</h2>
            <p className="text-gray-600">Age: {staffMember.age}</p>
            <p className="text-gray-600">Standard: {staffMember.standard}</p>
            <p className="text-gray-600">Faculty: {staffMember.faculty}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(staffMember)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteConfirm(staffMember)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this staff member?</p>
            <div className="mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding/editing staff */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative p-6 shadow-md rounded-md w-96">
            <h2 className="  text-xl font-semibold mb-4">{isEditing ? 'Edit Staff' : 'Add Staff'}</h2>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 text-xl"
            >
                <XCircle/>
            </button>

            <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="standard" className="block text-gray-700">Standard</label>
          <input
            type="number"
            id="standard"
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="faculty" className="block text-gray-700">Faculty</label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {isEditing ? 'Update Staff' : 'Create Staff'}
          </button>
          <button
              onClick={closeModal}
              className=" bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Cancel
            </button>
        </div>
      </form>


          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
