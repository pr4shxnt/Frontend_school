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

  const blog = blogData[0];
console.log(blogData);



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
            <div className="    text-white text-center default_m z-10">
              <h2 className="font-bold text-start text-xl md:text-4xl pt-8">{blog.title}</h2>

              <p className="mt-2 text-md text-justify text-gray-300 leading-5 hidden md:block">{blog.content.slice(0,1490)+`...`} <NavLink className="text-orange-500 hover:underline" to={`/blogs/${blog._id}`}>Read More</NavLink> </p>
              <p className="subtitle_default text-justify text-xs text-gray-400 md:hidden">{blog.content.slice(0,300)+`...`} <NavLink className="text-orange-500 hover:underline" to={`/blogs/${blog._id}`}>Read More</NavLink> </p>
              <p className="text-lg flex flex-col md:flex-row gap-3 justify-center w-full -4">
                <div className="md:absolute mt-4 md:mt-0 md:flex md:gap-3 bottom-2">
                <div className='text-orange-500  '>Author:</div> {blog.author}</div>
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
