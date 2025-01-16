import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogCreator = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: [],
    reviewed: false,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs`);
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  // Automatically clear error and success messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000); // 5000ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error, success]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.content || !formData.author) {
      return setError('Please fill out all required fields.');
    }

    setIsLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('content', formData.content);
    data.append('reviewed', formData.reviewed);

    for (const file of formData.image) {
      data.append('images', file);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/create`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setBlogs([...blogs, response.data.blog]);
      setSuccess('Blog created successfully!');
      setFormData({ title: '', content: '', author: '', image: [], reviewed: false });
      setImagePreviews([]);
    } catch (err) {
      setError('Error creating blog. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, image: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  };

  return (
    <div className="md:my-2 pt-24 md:pt-0 h-full px-3 md:px-24">
      <h1 className="text-[2.25rem] font-bold text-center mb-4">Create a New Blog</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <div className="w-full flex justify-evenly">
        <div className="w-full hidden md:flex justify-center">
          <img src="https://imgs.search.brave.com/9MRbzjN1j1Zht3PlLkbUEygtmG58Sa25NlnidI3spsE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y21zd2lyZS5jb20v/LS9tZWRpYS9kMGE5/YzgxMTBhNDM0MjI5/OWUyNGZlZDY2OTJh/ZGU4Mi5wbmc" alt="nono" />
        </div>
        <form className="flex flex-col my-10 w-full gap-4" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            className="bg-slate-200 outline-none rounded-md px-3 py-2"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            rows="10"
            placeholder="Content"
            value={formData.content}
            className="bg-slate-200 outline-none rounded-md px-3 py-2"
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            className="bg-slate-200 outline-none rounded-md px-3 py-2"
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <input
            type="file"
            multiple
            className="bg-slate-200 outline-none rounded-md w-full px-3 py-2"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap gap-3">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
          <button
            className={`py-3 hover:bg-orange-500 transition-all duration-700 font-semibold text-slate-600 hover:text-white border ${isLoading ? 'bg-gray-500' : 'border-orange-500'}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogCreator;
