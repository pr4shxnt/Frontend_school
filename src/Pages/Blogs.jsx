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
    <div className='pt-28 md:pt-0'>
        <header className=" shadow-sm">
        <div className=" mx-auto ">
        <div className="relative  rounded-xl shadow-md">
            <div className="absolute bg-black opacity-50 h-full w-full z-10">

            </div>
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"
                alt="About us"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute z-20 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
              <h1 className="text-5xl font-bold text-center text-gray-100">Recent Blogs and Posts</h1>
              <p className="mt-2 text-lg text-center text-gray-300">Do you want your own article to be published in this page? <NavLink>Create a blog</NavLink></p>
              </div>
            </div>

        </div>
      </header>
<div className="default_m grid grid-cols-1 gap-5 mb-10 md:grid-cols-2 lg:grid-cols-3 mt-5">
    {
        blogs.length > 0? (
            blogs.map((blog) => (
                <div
                key={blog._id}
                className="relative cursor-pointer group flex flex-col items-center bg-gray-100 overflow-hidden   shadow-lg"
              >
                {/* Blog Image */}
                <img
                  src={`${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images/${blog.images[0]}`} // Replace with your image URL or a placeholder
                  alt={blog.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay with Red Background */}
                <div className="absolute bg-opacity-10 inset-0 bg-gradient-to-t from-orange-600 to-orange-300 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-end items-center">
                  {/* Sliding Text */}
                  <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 h-full pt-20 flex flex-col justify-center items-center p-6">
                    <h2 className="text-xl text-white font-bold ">{`${blog.title.slice(0,30)}....`}</h2>
                    <p className="text-gray-200 text-sm">{blog.content.slice(0,30)+`...`}</p>
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
