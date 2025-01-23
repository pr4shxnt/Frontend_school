import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GalleryContainer.css";
import GalleryModel from "../Components/GalleryModel";

const GalleryContainer = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [model, setModel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/gallery`);
        setGalleryData(response.data.galleries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModel = (index) => {
    setCurrentIndex(index);
    setModel(true);
  };

  const closeModel = () => {
    setModel(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-300 to-gray-100'>
    <header className=" shadow-sm">
    <div className=" mx-auto ">
    <div className="relative  rounded-xl shadow-md">
        <div className="absolute bg-black opacity-50 h-full w-full z-10">

        </div>
          <img
            src="https://images.stockcake.com/public/d/4/4/d4480d3d-48d5-4778-bfa4-6c35cc9b84ae_large/art-gallery-exhibit-stockcake.jpg"
            alt="About us"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute z-20 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
          <h1 className="text-5xl font-bold text-center text-gray-100">Gallery</h1>
          <p className="mt-2 text-lg text-center text-gray-300">Take a Glimpse of some moments in PGS</p>
          </div>
        </div>

    </div>
  </header>

      <div className="list mt-10 space-y-4 md:px-20">
        {galleryData.map((gallery, index) => (
          <div
          onClick={() => openModel(index)}
            key={gallery._id}
            className="relative group hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_API_URI}${gallery.image}`}

              className="rounded-lg"
              alt={gallery.title || "Gallery Image"}
            />
            <div className="absolute rounded-lg bottom-0 w-full text-center h-16 bg-gradient-to-t from-gray-950 to-transparent text-white text-sm font-light">
              <div className="relative h-full">
                <h1 className="absolute group-hover:text-orange-500 transition-all ease-in-out duration-300 left-0 right-0 bottom-1 uppercase">
                  {gallery.title}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {model && (
        <GalleryModel
          galleryData={galleryData}
          currentIndex={currentIndex}
          closeModel={closeModel}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default GalleryContainer;
