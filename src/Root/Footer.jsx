import React from 'react'

const Footer = () => {
  return (
    <div className=' min-h-[70vh] container relative bg-gray-800 w-full'>
      <div className="flex default_m justify-between w-full">
        <div className="">
          <img className='w-64' src="https://krishnapranami.org/assets/front/images/pranam_logo.png" alt="logo" />
          
        </div>
        <div className="flex gap-10 text-white">


        <div className="">
            <h1 className='text-2xl font-bold mb-1' > Links</h1>
            <ul>
              <li className="">Admission form</li>
              <li className="">Admissions inquiry</li>
              <li className="">Scholarships inquiry</li>
              <li className="">Visit page</li>
              <li className="">History page</li>
              <li className="">Know our Staffs</li>
              
            </ul>
          </div>

          <div className="">
            <h1 className='text-2xl font-bold mb-1'>Quick Links</h1>
            <ul>
              <li className="">Home</li>
              <li className="">About</li>
              <li className="">Contact</li>
              <li className="">Blogs</li>
              <li className="">Gallery</li>
              <li className="">Events</li>
            </ul>
          </div>

         

          <div className="">
            <h1 className='text-2xl font-bold mb-1'>Redirect </h1>
            <ul>
              <li className="">Home</li>
              <li className="">About</li>
              <li className="">Contact</li>
              <li className="">Blogs</li>
              <li className="">Gallery</li>
              <li className="">Access your student-card</li>
            </ul>
          </div>

          <div className="">
            <h1 className='text-2xl font-bold mb-1'>Follow us on</h1>
            <ul>
              <li className="">Instagram</li>
              <li className="">Facebook</li>
              <li className="">Twitter</li>
              <li className="">Linkedin</li>
              <li className="">Youtube</li>
            </ul>
          </div>
        </div>
      </div>
<div className="absolute bottom-0 w-full justify-center flex bg-gray-400 py-3">
    <p className="  text-center  text-gray-700 text-sm">Pranami Global School <sup>©</sup> Copyright 2025 | Design and Developed by <a className='underline text-blue-500' target='_blank' href="https://www.prashantadhikari7.com.np">Prashant Adhikari</a></p>
</div>
    </div>
  )
}

export default Footer
