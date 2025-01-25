import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' py-16 md:py-28 container relative bg-gray-800 w-full'>
      <div className="flex  flex-col md:flex-row gap-10 items-center default_m justify-between w-full">
        <div className="">
          <img className='w-40 md:w-64' src="https://krishnapranami.org/assets/front/images/pranam_logo.png" alt="logo" />
          
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-white">


        <div className="">
            <h1 className='text-xl md:text-2xl font-bold mb-1' > Links</h1>
            <ul>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Admission form</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Admissions inquiry</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Scholarships inquiry</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Visit page</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">History page</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Know our Staffs</li>
              
            </ul>
          </div>

          <div className="">
            <h1 className='text-xl md:text-2xl font-bold mb-1'>Quick Links</h1>
            <ul>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Home</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">About us</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Contact us</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Latest Blogs</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Glimpse Gallery</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">upcoming Events</li>
            </ul>
          </div>

         

          <div className="">
            <h1 className='text-xl md:text-2xl font-bold mb-1'>Redirect </h1>
            <ul>
               <NavLink> <li className="text-xs md:text-sm hover:underline cursor-pointer hover:underline">Access student-card</li></NavLink>
               <NavLink>              <li className="text-xs md:text-sm hover:underline cursor-pointer hover:underline">PyQs</li>
</NavLink>
               <NavLink>              <li className="text-xs md:text-sm hover:underline cursor-pointer hover:underline">Khijda Mandir</li>
</NavLink>
             
            </ul>
          </div>

          <div className="">
            <h1 className='text-xl md:text-2xl font-bold mb-1'>Follow us on</h1>
            <ul>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Instagram</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Facebook</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Twitter</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Linkedin</li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">Youtube</li>
            </ul>
          </div>
        </div>
      </div>
<div className="absolute bottom-0 w-full justify-center flex bg-gray-400 py-3">
    <p className="  text-center  text-gray-700 text-xs md:text-sm">Pranami Global School <sup>©</sup> Copyright 2025 | Design and Developed by <a className='underline text-blue-500' target='_blank' href="https://www.prashantadhikari7.com.np">Prashant Adhikari</a></p>
</div>
    </div>
  )
}

export default Footer
