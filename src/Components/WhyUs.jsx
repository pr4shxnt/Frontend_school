import React from "react";
import FlipCard from "./UI/FlippingCards";
import { BookCopyIcon, AwardIcon, RocketIcon, GlobeIcon } from "lucide-react";
import awards from "../assets/awards.jpg"
import curriculum from "../assets/curriculum.jpg"
import future from "../assets/future-ready.jpg"
import globalrecog from "../assets/globalrecog.jpg"


const features = [
  {
    title: "Innovative Curriculum",
    description:
      "We provide a unique learning experience with modern methodologies tailored to every student.",
    buttonText: "Learn More",
    icon: BookCopyIcon,
    frontColor: "#402A2C",
    backColor: "black",
    frontImage: curriculum,
  },
  {
    title: "Global Recognition",
    description:
      "Pranami Global School is recognized internationally for academic excellence.",
    buttonText: "Discover",
    icon: GlobeIcon,
    frontColor: "#EB8F41",
    backColor: "gray",
    frontImage: awards,
  },
  {
    title: "Excellence Awards",
    description:
      "Our students and staff have been awarded multiple times for their excellence.",
    buttonText: "Explore",
    icon: AwardIcon,
    frontColor: "#703D57",
    backColor: "black",
    frontImage: globalrecog,
  },
  {
    title: "Future Ready",
    description:
      "We focus on preparing students for the future with technology-driven education.",
    buttonText: "Join Us",
    icon: RocketIcon,
    frontColor: "#7B6D8D",
    backColor: "gray",
    frontImage: future,
  },
];

const WhyUs = () => {
  return (
    <div className="default_m mt-10 px-4">
      {/* Header Section */}
      <div className="  mb-8 w-full">
        <h1 className="header_default">Why <span className="text-[#EB8F41]"> PGS ?</span> </h1>
        <p className="subtitle_default text-start">
          Discover what makes our school unique and a great place for your
          child’s education.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-10">
        {features.map((feature, index) => (
          <FlipCard
            key={index}
            title={feature.title}
            frontColor={feature.frontColor}
            backColor={feature.backColor}
            icon={<feature.icon size={96} color={feature.frontColor}/>}
            description={feature.description}
            buttonText={feature.buttonText}
            frontImage={feature.frontImage}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
