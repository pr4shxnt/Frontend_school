import React from 'react';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

function Contact() {
  return (
    <div className="container bg-gradient-to-b from-gray-300 to-white">
      {/* Header */}
      <header className=" shadow-sm">
        <div className=" mx-auto ">
        <div className="relative  rounded-xl shadow-md">
            <div className="absolute bg-black opacity-50 h-full w-full z-10">

            </div>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                alt="School Campus"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute z-20 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
              <h1 className="text-5xl font-bold text-center text-gray-100">Contact Us</h1>
              <p className="mt-2 text-lg text-center text-gray-300">We're here to help and answer any questions you might have</p>
              </div>
            </div>

        </div>
      </header>

      <main className="default_m mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Education Avenue<br />Learning District<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">admissions@schoolname.edu</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Globe className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Virtual Tours</h3>
                    <p className="text-gray-600">Available by appointment</p>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>

                <input
                  type="text"
                  id="name"
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your name here"
                />
              </div>

              <div>

                <input
                  type="email"
                  id="email"
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="provide your personnal email address"
                />
              </div>

              <div>

                <input
                  type="tel"
                  id="phone"
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your phone number here"
                />
              </div>

              <div>

                <select
                  id="subject"
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option defaultChecked disabled>Choose a subject</option>

                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Financial Aid</option>
                  <option>Academic Programs</option>
                  <option>Campus Tours</option>
                </select>
              </div>

              <div>

                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <iframe className='my-7 rounded-3xl shadow-2xl  transition-all duration-500' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.1270691042723!2d70.05275217480825!3d22.46185873702101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39576ab5f22d4899%3A0xe7fd2599a09d0366!2sPranami%20Global%20School!5e0!3m2!1sen!2snp!4v1737448394565!5m2!1sen!2snp" width="100%" height="400"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </main>
    </div>
  );
}

export default Contact;
