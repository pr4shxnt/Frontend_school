import axios from 'axios';
import { ChevronRightCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null); // State to track errors

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/reviewed`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to fetch blogs. Please try again later.');
    }
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);


  console.log(blogs);


  return (
    <div className='pt-28 px-4 md:px-16 md:pt-4'>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
<div className="">
    <h1 className='header_default'>Blog Posts</h1>
    <p className="subtitle_default">Check out our blog posts </p>
</div>
<div className="flex gap-2 items-end">
    Want your own article? <NavLink to="/blogs/create-new" className="text-purple-500 hover:underline cursor-pointer"> Create blog.</NavLink>
</div>
</div>
<div className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-2 lg:grid-cols-3 mt-5">
    {
        blogs.length > 0? (
            blogs.map((blog) => (
                <div
                key={blog._id}
                className="relative cursor-pointer group flex flex-col items-center bg-gray-100 overflow-hidden rounded-lg shadow-lg"
              >
                {/* Blog Image */}
                <img
                  src={`${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images/${blog.images[0]}`} // Replace with your image URL or a placeholder
                  alt={blog.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay with Red Background */}
                <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-end items-center">
                  {/* Sliding Text */}
                  <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-center items-center p-6">
                    <h2 className="text-xl text-white font-bold mb-2">{`${blog.title.slice(0,30)}....`}</h2>
                    <p className="text-gray-200 text-sm mb-4">{blog.description}</p>
                    <a
                      href={`/blogs/${blog._id}`}
                      className="  text-white px-4 py-2   "
                    >
                      <ChevronRightCircle/>
                    </a>
                  </div>
                </div>
              </div>

            ))
        ) : (
            <p className="text-xl text-gray-500">No blog posts found.</p>
        )
    }
</div>
    </div>
  )
}

export default Blogs
