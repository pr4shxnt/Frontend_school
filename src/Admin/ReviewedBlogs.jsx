import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewedBlogCard = ({fetchBlogs, id, title, author, date, content, images, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(id);
      setShowDeleteModal(false);
      fetchBlogs();
    } catch (error) {
      console.error(  error);
    }
  };

  return (
    <div className="shadow-lg border rounded-md">
      <div className="w-full h-64 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images/${images[0]}`}
          alt="Blog"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-xl text-orange-500">{title}</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Author: </span>
          {author}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Last Updated: </span>
          {new Date(date).toLocaleDateString('en-CA')}
        </p>
        <p className="mt-2 text-gray-700">
          <span className="font-semibold">Content: </span>
          {`${content.slice(0, 150)}...`}
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

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
    </div>
  );
};

const ReviewedBlogs = () => {
  const [reviewedBlogs, setReviewedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/reviewed`);
      setReviewedBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/${id}`);

    } catch (error) {
      console.error('Error deleting blog:', error);
      alert(  error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Reviewed Blogs</h2>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewedBlogs.map((blog) => (
            <ReviewedBlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              author={blog.author}
              date={blog.updatedAt}
              content={blog.content}
              images={blog.images}
              onDelete={handleDelete}
              fetchBlogs={fetchBlogs}
            />
          ))}
        </div>
      )}

      {reviewedBlogs.length === 0 && !loading && (
        <p>No reviewed blogs found.</p>
      )}
    </div>
  );
};

export default ReviewedBlogs;
