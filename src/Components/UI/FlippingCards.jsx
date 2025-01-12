import React from "react";
import "./FlipCard.css";

const FlipCard = ({
  title,
  frontImage,
  icon,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="flip-card cursor-pointer">
      <div className="flip-card-inner">
        {/* Front Side */}
        <div
          className="flip-card-front gap-2"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${frontImage})`, // Correct gradient + image overlay
            backgroundSize: "cover",  // Ensures the image fits without stretching
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating of the image
            backgroundColor: "gray", // Fallback background color
          }}
        >
          <div className="">{icon}</div>
          <div className="font-bold text-white">
            <h1>{title}</h1>
          </div>
        </div>
        {/* Back Side */}
        <div
          className="flip-card-back"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${frontImage})`, // Correct gradient + image overlay
            backgroundSize: "cover",  // Ensures the image fits without stretching
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating of the image
            backgroundColor: "gray", // Fallback background color
          }}
        >
          <p>{description}</p>
          <button className="action-button" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
