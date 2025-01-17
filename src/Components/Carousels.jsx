import React, { useState, useEffect } from 'react';

const Carousels = ({ images, basePath }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]);

  if (!images || images.length === 0) {
    return <p>No images to display</p>;
  }

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Shift images based on current index
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={`${basePath}/${image}`}
            alt={`Slide ${index + 1}`}
            className="w-full h-96 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)} // Navigate to specific slide
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-gray-400 hover:bg-white opacity-70'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousels;
