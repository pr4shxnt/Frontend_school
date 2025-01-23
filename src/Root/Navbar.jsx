import { ChevronDown, MenuIcon, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SubNavbar from "./SubNavbar";
import NavbarResponsive from "./NavbarResponsive";
import Socialdropdown from "./Socialdropdown";
import { NavLink, useLocation, useParams } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();


    const [navFixed, setNavFixed] = useState(true)

    useEffect(() => {
        // Set `navFixed` to true only if the current path is `/home`
        setNavFixed(location.pathname === "/");
      }, [location.pathname]); // Run this effect whenever the path changes



  const [menuToggle, setMenuToggle] = useState(false);
  const [socialsDrop, setSocialsDrop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Determine scroll direction


      setIsScrolled(scrollTop > 0); // Check if the page is scrolled
      setLastScrollTop(scrollTop); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={`navbar  ${navFixed? "fixed " : "fixed md:relative container"} w-full z-50 shadow-lg transition-transform duration-300
        `}
    >

      <div
        className={`px-1 lg:px-20  flex justify-between items-center text-gray-500 w-full ${
          isScrolled && navFixed ? "md:h-14 bg-gray-200 md:py-8 h-20 py-12" : "h-20 bg-gray-100 py-12 "
        } transition-all duration-300 `}
      >
        {/* LOGO BOX */}
        <div className="py-20">
            <NavLink  to="/">
          <img
            src=""
            className={`${isScrolled && navFixed? "h-20 md:h-12" : "h-20"} transition-all duration-300`}
            alt="LOGO"
          />
          </NavLink>
        </div>

        {/* MENU */}
        <div
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
          className="md:hidden"
        >
          {menuToggle ? <X size={24} /> : <MenuIcon size={24} />}
        </div>

        {/* MENU LIST */}
        <div className="menu-bar hidden md:block">
          <ul className="flex gap-5">
            <NavLink className="nav-link" to="/">
            <li className="cursor-pointer transition-all ease-in duration-300">
              Home
            </li>
            </NavLink>
            <NavLink className="nav-link" to="/about">
            <li className="cursor-pointer transition-all ease-in duration-300">
              About
            </li>
            </NavLink>

            <NavLink className="nav-link" to="/contact">
            <li className="cursor-pointer transition-all ease-in duration-300">
              Contact
            </li>
            </NavLink>



            <NavLink className="nav-link" to="/gallery">
            <li className="cursor-pointer transition-all ease-in duration-300">
              Gallery
            </li>
            </NavLink>

            <NavLink className="nav-link" to="/admission">
            <li className="cursor-pointer transition-all ease-in duration-300">
              Online Admission
            </li>
            </NavLink>

            <NavLink className="nav-link" to="/visit-form">
            <li className="cursor-pointer transition-all ease-in duration-300">
              Visit PGS
            </li>
            </NavLink>


          </ul>
        </div>

        {/* BUTTON */}
        <div className="hidden md:block">
          <div className="relative">
            <button
              onClick={() => {
                setSocialsDrop(!socialsDrop);
              }}
              className="flex gap-2 items-center border px-2 rounded-full py-2"
            >
              <div className="">
                <img
                  src=""
                  alt="Logo"
                  className="h-7 w-7 rounded-full"
                />
              </div>
              <h1>Socials</h1>
              <div className={socialsDrop ? "rotate-180" : ""}>
                <ChevronDown />
              </div>
            </button>
            <div className={`${socialsDrop ? "absolute" : "hidden"} top-16 z-[999] right-0`}>
              <Socialdropdown

              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${menuToggle ? "" : "hidden"} md:${isScrolled && navFixed? "hidden" : ""} md:block`}>
        <SubNavbar
        setMenuToggle={setMenuToggle}
        menuToggle={menuToggle}
        />
      </div>
      <div className={`${menuToggle ? "" : "hidden"} md:hidden`}>
        <NavbarResponsive
        setMenuToggle={setMenuToggle}
        menuToggle={menuToggle}
        />
      </div>
    </div>
  );
};

export default Navbar;
