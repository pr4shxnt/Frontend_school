import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import Carousels from '../Components/Carousels';

const IndividualBlogs = () => {
  const { _id } = useParams(); // Access the _id from the route
  const [blog, setBlog] = useState(null);

  // Fetch all blogs and filter by _id
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/reviewed`); // Fetch all blogs
        const data = await response.json();
        const selectedBlog = data.find((b) => b._id === _id); // Find the blog with the matching _id
        setBlog(selectedBlog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [_id]);

  if (!blog) {
    return <p>Error 404</p>;
  }

  // Function to split content into chunks of 5 sentences
  const splitContent = (content) => {
    const sentences = content.split(/(?<=\w[.!?])\s+/); // Split based on sentence punctuation
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += 10) {
      paragraphs.push(sentences.slice(i, i + 10).join(' '));
    }

    return paragraphs;
  };

  const paragraphs = splitContent(blog.content);

  return (
    <div className="pt-28 md:pt-6 p-6 md:px-28">
        <h1 className="header_default">{blog.title}</h1>
        <div className="flex w-full gap-2 mb-4 justify-end">
          Want your own article? <NavLink to="/blogs/create-new" className="text-purple-500 hover:underline cursor-pointer"> Create blog.</NavLink>
        </div>
      <Carousels
        images={blog.images}
        basePath={`${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images`}
      />
      <div className="w-full my-4 flex flex-col md:flex-row gap-10 justify-between">
        <h2 className="text-xl font-light"><span className="font-bold text-orange-500">Authored by: </span> {blog.author}</h2>
        <p className="text-gray-600">
                <span className="font-semibold">Last Updated: </span>
                {new Date(blog.updatedAt).toLocaleDateString('en-CA')}
              </p>
      </div>

      {/* Render paragraphs */}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="subtitle_default text-justify">{paragraph}</p>
      ))}
    </div>
  );
};

export default IndividualBlogs;
