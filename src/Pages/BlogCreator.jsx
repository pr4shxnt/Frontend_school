import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogCreator = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: [],
    reviewed: false,
  });
  const [imagePreviews, setImagePreviews] = useState([]); // For storing image previews

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('content', formData.content);
    data.append('reviewed', formData.reviewed);

    // Append files (images)
    for (let i = 0; i < formData.image.length; i++) {
      data.append('images', formData.image[i]);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/create`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Blog created:', response.data);
      // Optionally, you can update the list of blogs
      setBlogs([...blogs, response.data.blog]);
    } catch (error) {
      console.error('Error creating blog:', error);
    }

    // Reset form fields
    setFormData({
      title: '',
      content: '',
      author: '',
      image: [],
      reviewed: false,
    });
    setImagePreviews([]);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, image: files });

    // Generate image previews
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews); // Set previews when all are ready
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  return (
    <div className="  w-full min-h-screen flex justify-evenly">
      <div className="w-full">
        <img
          src="https://imgs.search.brave.com/7gXGLSxEmX0PINI8x6Oiouqtah03XOwldyOwZzSm7LE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aHVic3BvdC5jb20v/aHViZnMvVW50aXRs/ZWQlMjBkZXNpZ24l/MjAoMzUpLmpwZw"
          alt=""
        />
      </div>

      <form className="flex flex-col w-full gap-2" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          className="bg-slate-700 px-3 py-2"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          rows="10"
          placeholder="Content"
          value={formData.content}
          className=" bg-slate-700 px-3 py-2 "
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />


        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          className="bg-slate-700 px-3 py-2"
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />


<div className="  bg-slate-700 w-full">
        <input
          type="file"
          multiple
          className="bg-slate-700 w-full px-3 py-2"
          onChange={handleImageChange}
        />

<div className="m-2  flex flex-wrap gap-3">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-auto rounded-xl h-32 object-cover mr-2"
            />
          ))}
        </div>
</div>
        {/* Display image previews */}


        <button className="mt-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogCreator;
