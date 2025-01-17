import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/reviewed`
      );
      // Sort blogs by createdAt in descending order (newest first)
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogData(sortedData);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const blog = blogData[0]; // Get the latest blog (sorted by createdAt)

  return (
    <div className=" ">

      <div className="blog-container">
        {blog ? (
          <div
            className="relative r bg-cover bg-center bg-fixed  flex items-center justify-center"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images/${blog.images[0]})`,
            }}
          >

            <div className="absolute top-0 z-20 rounded-br-full left-0 pr-14 pl-5 py-4 font-bold flex gap-2 text-sm md:text-xl text-white bg-orange-500">
                Latest Blog
            </div>
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-70 "></div>

            {/* Blog Content */}
            <div className="relative   text-white text-center default_m z-10">
              <h2 className="header_default pt-8">{blog.title}</h2>

              <p className="subtitle_default hidden md:block">{blog.content.slice(0,1300)+`...`} <NavLink className="text-orange-500 hover:underline" to={`/blogs/${blog._id}`}>Read More</NavLink> </p>
              <p className="subtitle_default text-gray-400 md:hidden">{blog.content.slice(0,300)+`...`} <NavLink className="text-orange-500 hover:underline" to={`/blogs/${blog._id}`}>Read More</NavLink> </p>
              <p className="text-lg flex flex-col md:flex-row gap-3 justify-center w-full mb-4">
                <div className='text-orange-500  '>Author:</div> {blog.author}
              </p>
            </div>
          </div>
        ) : (
          <p>No blog data available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
