import React from "react";
import ImageSlider from "../Components/ImageSlider";
import WhyUs from "../Components/WhyUs";
import { EventsClient } from "./EventsClient";
import { CampusLifePage } from "./CampusLife";
import StudentCardAccess from "../Components/StudentCardAccess";
import HomeStaffs from "../Components/HomeStaffs";
import Blog from "../Components/Blog";

const Home = () => {
  return (
    <div className="min-h-screen container bg-gradient-to-b from-gray-100 to-white">
      <ImageSlider />
      <WhyUs />
      <CampusLifePage />
      <EventsClient /><HomeStaffs/>
      <Blog/>

    </div>
  );
};

export default Home;
