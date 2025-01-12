import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGalleryId, setCurrentGalleryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch galleries from API
  const fetchGalleries = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/gallery`);
      setGalleries(response.data.galleries);
    } catch (error) {
      setErrorMessage('Error fetching galleries.');
      console.error('Error fetching galleries:', error);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Handle form submission for creating or updating a gallery
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isEditing) {
        // Update gallery (with or without new image)
        await axios.put(`${import.meta.env.VITE_BACKEND_API_URI}/api/gallery/${currentGalleryId}`, formData);
        setIsEditing(false);
        setCurrentGalleryId(null);
      } else {
        // Create gallery
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URI}/api/gallery/create`, formData);
      }
      setTitle('');
      setCategory('');
      setImage(null);
      setImagePreview(null);
      setIsModalOpen(false); // Close modal after submission
      fetchGalleries();
    } catch (error) {
      setErrorMessage('Error creating/updating gallery.');
      console.error('Error creating/updating gallery:', error);
    }
  };

  // Handle delete operation with confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API_URI}/api/gallery/${galleryToDelete._id}`);
      fetchGalleries();
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      setErrorMessage('Error deleting gallery.');
      console.error('Error deleting gallery:', error);
    }
  };

  // Handle editing operation (only for title and category)
  const handleEdit = (gallery) => {
    setTitle(gallery.title);
    setCategory(gallery.category);
    setIsEditing(true);
    setCurrentGalleryId(gallery._id);
    setIsModalOpen(true); // Open modal when editing
  };

  // Open delete confirmation popup
  const openDeleteConfirm = (gallery) => {
    setGalleryToDelete(gallery);
    setIsDeleteConfirmOpen(true);
  };

  // Close modals
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentGalleryId(null);
    setTitle('');
    setCategory('');
    setImage(null);
    setImagePreview(null);
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set preview
  };

  return (
    <div className="md:p-8 w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8">Gallery Management</h1>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      {/* Form for creating new gallery */}
      <form onSubmit={handleSubmit} className="mb-8 w-full">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image</label>
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {isEditing ? 'Update Gallery' : 'Create Gallery'}
          </button>
        </div>
      </form>

      {/* Gallery list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6">
        {galleries.map((gallery) => (
          <div key={gallery._id} className="bg-white p-4 shadow-md rounded-md">
            <img
              src={`${import.meta.env.VITE_BACKEND_API_URI}${gallery.image}`}
              alt={gallery.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold">{gallery.title}</h2>
            <p className="text-gray-600">{gallery.category}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(gallery)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteConfirm(gallery)}
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
            <p>Are you sure you want to delete this snap?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
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

      {/* Modal for editing gallery */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Gallery' : 'Create Gallery'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Image field should not be editable */}

              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  {isEditing ? 'Update Gallery' : 'Create Gallery'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
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

export default Gallery;
