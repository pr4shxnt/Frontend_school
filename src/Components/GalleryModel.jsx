import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import React from "react";

const GalleryModel = ({ galleryData, currentIndex, closeModel, handleNext, handlePrevious }) => {
  const gallery = galleryData[currentIndex];

  if (!gallery) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative flex items-center justify-center rounded-lg shadow-lg w-full h-screen ">
        <button
          onClick={closeModel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="flex items-center justify-center">
          <button
            onClick={handlePrevious}
            className="bg-gray-200 absolute left-0 lg:left-4  p-2 rounded-full text-gray-700 hover:bg-gray-300"
          >
            <ChevronLeft/>
          </button>

          <img
            src={`http://localhost:5000${gallery.image}`}
            alt={gallery.title || "Gallery Image"}
            className="max-h-[95vh]  lg:m-4"
          />

          <button
            onClick={handleNext}
            className="bg-gray-200 absolute right-0 lg:right-4 p-2 rounded-full  text-gray-700 hover:bg-gray-300"
          >
            <ChevronRightIcon/>
          </button>

                <h1 className="absolute text-center text-sm text-white bg-black lg:bg-opacity-0 left-0 right-0 bottom-0 uppercase">
                  {gallery.title}
                </h1>


        </div>


      </div>
    </div>
  );
};

export default GalleryModel;
