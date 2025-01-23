import React from 'react'
import { BookOpen, Users, Trophy, Calendar, Globe2 } from 'lucide-react';

const About = () => {
  return (
    <div className='  pt-20 md:pt-0 container bg-gradient-to-b from-gray-300 to-gray-100'>
        <header className=" shadow-sm">
        <div className=" mx-auto ">
        <div className="relative  rounded-xl shadow-md">
            <div className="absolute bg-black opacity-50 h-full w-full z-10">

            </div>
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"
                alt="About us"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute z-20 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
              <h1 className="text-5xl font-bold text-center text-gray-100">About Pranami Global School</h1>
              <p className="mt-2 text-lg text-center text-gray-300">Nurturing minds, building futures, and creating leaders since 1985.</p>
              </div>
            </div>

        </div>
      </header>



      {/* Main Content */}
      <div className=" default_m mx-auto px-6 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white hover:scale-105 cursor-pointer hover:shadow-2xl transition-all duration-500 p-6 rounded-lg shadow-md text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <p className="text-2xl font-bold">45+</p>
            <p className="text-gray-600">Programs Offered</p>
          </div>
          <div className="bg-white hover:scale-105 cursor-pointer hover:shadow-2xl transition-all duration-500 p-6 rounded-lg shadow-md text-center">
            <Users className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <p className="text-2xl font-bold">2,500+</p>
            <p className="text-gray-600">Students</p>
          </div>
          <div className="bg-white hover:scale-105 cursor-pointer hover:shadow-2xl transition-all duration-500 p-6 rounded-lg shadow-md text-center">
            <Trophy className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <p className="text-2xl font-bold">98%</p>
            <p className="text-gray-600">Graduate Success Rate</p>
          </div>
          <div className="bg-white hover:scale-105 cursor-pointer hover:shadow-2xl transition-all duration-500 p-6 rounded-lg shadow-md text-center">
            <Calendar className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <p className="text-2xl font-bold">38</p>
            <p className="text-gray-600">Years of Excellence</p>
          </div>
        </div>

        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1985, Westbrook Academy has been at the forefront of educational excellence for over three decades. Our commitment to academic rigor, personal growth, and community engagement has shaped thousands of successful graduates.
            </p>
            <p className="text-gray-600 mb-4">
              We believe in providing a comprehensive education that goes beyond textbooks. Our innovative curriculum, combined with state-of-the-art facilities and dedicated faculty, creates an environment where students can discover their passions and reach their full potential.
            </p>
            <p className="text-gray-600">
              At Westbrook, we're more than just a school - we're a community of lifelong learners, innovators, and leaders preparing for the challenges of tomorrow.
            </p>
            <p className="flex items-center gap-1.5"> Click here to redirect to the <p className="text-purple-600 hover:underline cursor-pointer py-4 rounded-md   transition-all duration-300">
              history page
            </p></p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
              alt="Students studying"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Mission and Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Academic Excellence</h3>
              <p className="text-gray-600">
                We foster a rigorous academic environment that challenges students to reach their highest potential and develop critical thinking skills.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Character Development</h3>
              <p className="text-gray-600">
                We emphasize integrity, responsibility, and ethical behavior as fundamental components of personal growth.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Community Engagement</h3>
              <p className="text-gray-600">
                We encourage active participation in community service and foster a sense of global citizenship.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

    </div>

  )
}

export default About
