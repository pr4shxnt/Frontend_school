import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const subItems = [
  {
    title: 'Admissions',
    link: "#",
    subItems: [
      { title: 'Admission Page', link: '/admissions' },
      { title: 'Admission Requirements', link: 'admissions/requirements' },
      { title: 'Financial Aid', link: 'inquiry/financial-aid' },
      { title: 'Scholarships & Grants', link: 'gallery/scholarships' },
      { title: 'Scholarship Applications', link: 'admissions/apply/scholarships' },
      { title: 'Admission Applications', link: 'admissions/applications' },
      { title: 'Admission Criteria', link: 'admissions/criteria' },
    ],
  },
  {
    title: 'PYqs',
    link: '#',
    subItems: [
      { title: 'All PYQs', link: '/pyqs/all' },
      { title: 'Class 10 Boards', link: '/pyqs/class-10' },
      { title: 'Entrance Exams PYQs', link: 'https://example.com/entrance-pyqs' },
    ],
  },
  { title: 'Videos', link: '/videos' },
  { title: 'Blogs', link: '/blogs' },
  { title: 'Staffs', link: '/staff' },
  { title: 'Sports', link: '/sports' },
  { title: 'Academia', link: '/academia' },
  { title: 'Facilities', link: '/facilities' },
  { title: 'History', link: '/history' },
  { title: 'Events', link: '/events' },
  { title: 'FAQs', link: '/faqs' },
];

const SubNavbar = ({ setMenuToggle, menuToggle }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    setCanScrollLeft(scrollContainer.scrollLeft > 0);
    setCanScrollRight(
      scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth
    );
  };

  const scroll = (direction) => {
    const scrollContainer = scrollRef.current;
    scrollContainer.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    handleScroll();
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderLink = (item) => {
    const { link, title } = item;

    if (typeof link === 'string' && (link.startsWith('http') || link.startsWith('https'))) {
      return (
        <a onClick={() => handleClick(item)} href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      );
    } else {
      return (
        <Link onClick={() => handleClick(item)} to={link}>
          {title}
        </Link>
      );
    }
  };

  return (
    <div className="relative text-[wheat] px-8 md:px-20 bg-orange-950">

        <button
          className="absolute left-0 top-1 flex items-center justify-center bottom-0 z-10 bg-gray-100 h-8 w-8 text-black p-2 rounded-full shadow-md"
          onClick={() => scroll('left')}
        >
          &lt;
        </button>

      <div
        ref={scrollRef}
        className=" flex justify-center shadow-md overflow-auto custom-scrollbar"
      >
        <ul className="w-full flex text-center items-center">
          {subItems.map((item, index) => (
            <li
              key={index}
              className="group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="py-2 px-10 font-light block hover:underline cursor-pointer">
                {renderLink(item)}
              </div>
              {item.subItems && activeIndex === index && (
                <div className="absolute right-0 left-0 border-t-2 shadow-lg w-screen bg-white">
                  <h1 className="text-2xl font-extrabold mt-2 md:mt-5">
                    Links ({item.title})
                  </h1>
                  <ul className="grid grid-rows-3 grid-cols-3 gap-x-10 px-10 py-3 rounded-lg">
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="py-2 mt-3 mb-3 md:px-4 text-gray-500 hover:text-[#EB8F41] text-center justify-center flex cursor-pointer"
                      >
                        {renderLink(subItem)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

        <button
          className="absolute right-0 top-1 flex items-center justify-center bottom-0 z-10 bg-gray-100 h-8 w-8 text-black p-2 rounded-full shadow-md"
          onClick={() => scroll('right')}
        >
          &gt;
        </button>

    </div>
  );
};

export default SubNavbar;
