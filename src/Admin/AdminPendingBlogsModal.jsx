import React, { useState, useEffect } from "react";
import { PenBox } from "lucide-react";
import axios from "axios";

const AdminPendingBlogsModal = ({
  show,
  setShow,
  images,
  id,
  title,
  content,
  author,
}) => {
  const baseImageURL = `${import.meta.env.VITE_BACKEND_API_URI}/uploads/blog_images`;

  const [formData, setFormData] = useState({
    title,
    content,
    author,
    isReviewed: false,
    image: [], // Array to hold new images for the update
  });

  const [imagePreviews, setImagePreviews] = useState(images || []);

  useEffect(() => {
    setFormData({
      title,
      content,
      author,
      isReviewed: false, // Assuming this field is a boolean
      image: [], // Reset the image array when modal is opened
    });
  }, [show, title, content, author, images]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);
    data.append("isReviewed", formData.isReviewed);

    // Append images for upload if any
    formData.image.forEach((file) => data.append("images", file));

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Blog updated successfully:", response.data);
      setShow(false); // Close modal after success
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, image: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    show && (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
          {/* Close Button */}
          <div onClick={() => setShow(false)} className="absolute top-2 right-2 cursor-pointer">
            x
          </div>

          {/* Modal Content */}
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-xl flex gap-3 font-semibold mb-4">
              {title} <PenBox />
            </h2>
            <input
              type="text"
              className="bg-gray-100 p-2 w-full mb-4"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              className="bg-gray-100 p-2 w-full mb-4"
              placeholder="Content"
              rows="5"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <input
              type="text"
              className="bg-gray-100 p-2 w-full mb-4"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />

            {/* Image upload field */}
            <input
              type="file"
              multiple
              className="bg-gray-100 p-2 w-full mb-4"
              onChange={handleImageChange}
            />

            {/* Image Previews */}
            <div className="flex justify-center flex-wrap gap-3 mt-4">
              {imagePreviews.map((image, index) => (
                <img
                  key={index}
                  className="h-48 w-48 object-cover rounded-md"
                  src={image}
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 w-full"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AdminPendingBlogsModal;
