import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilLine, X } from 'lucide-react';

const ReviewedBlogCard = ({ id, title, author, date, content, images, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleDelete = async () => {
    try {
      await onDelete(id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
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
        <h2 className="font-semibold text-xl text-orange-500">{title.slice(0,50)+"..."}</h2>
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
            onClick={() => onEdit({ id, title, author, content })}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
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
  const [selectedBlog, setSelectedBlog] = useState(null);
   const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });

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
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/${selectedBlog.id}`, formData);
      setSelectedBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
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
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {reviewedBlogs.length === 0 && !loading && (
        <p>No reviewed blogs found.</p>
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

export default ReviewedBlogs;
