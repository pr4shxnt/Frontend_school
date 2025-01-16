import axios from 'axios';
import { PencilLine, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const PendingBlogs = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    isReviewed: false,
  });
  const [editingField, setEditingField] = useState(null); // Tracks the field being edited
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Added state for delete modal
  const [blogToDelete, setBlogToDelete] = useState(null); // Track the blog to delete


    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/pending`
        );
        setPendingBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      isReviewed: blog.isReviewed || false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/${selectedBlog._id}`,
        formData
      );
      setMessage('Blog updated successfully!');
      setPendingBlogs((prev) =>
        prev.map((blog) =>
          blog._id === selectedBlog._id ? { ...blog, ...formData } : blog
        )
      );
      setSelectedBlog(null);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating blog:', error);
      setMessage('Error updating blog.');
    }

    fetchBlogs();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/${blogToDelete._id}`
      );
      setMessage('Blog deleted successfully!');
      setPendingBlogs((prev) =>
        prev.filter((blog) => blog._id !== blogToDelete._id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting blog:', error);
      setMessage('Error deleting blog.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Pending Blogs</h1>


      {message && <p className="mb-4 text-green-500">{message}</p>} <div className="grid grid-cols-3">
      {pendingBlogs.length === 0 ? (
        <p>No pending blogs found.</p>
      ) : (
        pendingBlogs.map((blog) => (
          <div key={blog._id} className="shadow-lg border rounded-md mb-4">
            <div className="w-full h-64 overflow-hidden">
            <img
          src={`${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images/${blog.images[0]}`}
          alt="Blog"
          className="w-full h-full object-cover"
        />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-xl text-orange-500">{blog.title}</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Author: </span>
                {blog.author}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Last Updated: </span>
                {new Date(blog.updatedAt).toLocaleDateString('en-CA')}
              </p>
              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Content: </span>
                {`${blog.content.slice(0, 150)}...`}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Review
                </button>
                <button
                  onClick={() => {
                    setBlogToDelete(blog); // Set blog to be deleted
                    setShowDeleteModal(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            </div>

          </div>

        ))
      )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="mb-4">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>

            {/* Title Field */}
            <div className="mb-4 ">
              <span className="flex justify-between w-full font-bold">
                Title:
                <button
                  onClick={() =>
                    setEditingField(editingField === 'title' ? null : 'title')
                  }
                  className="ml-2 text-gray-800"
                >
                  {editingField === 'title' ? <X /> : <PencilLine />}
                </button>
              </span>
              {editingField === 'title' ? (
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              ) : (
                <p className="mt-2">{formData.title}</p>
              )}
            </div>

            {/* Author Field */}
            <div className="mb-4">
              <span className="flex justify-between w-full font-bold">
                Author:
                <button
                  onClick={() =>
                    setEditingField(editingField === 'author' ? null : 'author')
                  }
                  className="ml-2 text-gray-800"
                >
                  {editingField === 'author' ? <X /> : <PencilLine />}
                </button>
              </span>
              {editingField === 'author' ? (
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              ) : (
                <p className="mt-2">{formData.author}</p>
              )}
            </div>

            {/* Content Field */}
            <div className="mb-4">
              <span className="flex justify-between w-full font-bold">
                Content:
                <button
                  onClick={() =>
                    setEditingField(editingField === 'content' ? null : 'content')
                  }
                  className="ml-2 text-gray-800"
                >
                  {editingField === 'content' ? <X /> : <PencilLine />}
                </button>
              </span>
              {editingField === 'content' ? (
                <div className="relative mt-2">
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="block h-72 w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              ) : (
                <div className="max-h-72 overflow-auto mt-2">
                  {formData.content}
                </div>
              )}
            </div>

            {/* Reviewed Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isReviewed"
                checked={formData.isReviewed}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Mark as Reviewed</span>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  setEditingField(null);
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingBlogs;
