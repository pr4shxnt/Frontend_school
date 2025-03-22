import React, { useState } from 'react';
import { School, Send, Phone, Mail, MapPin, Globe } from 'lucide-react';
import axios from 'axios';

function AdmissionInquiryForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gradeApplying: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    message: ''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();


    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URI}/api/admissionInquiry`, formData);
        
        setFormData({
            studentName: '',
            dateOfBirth: '',
            gradeApplying: '',
            parentName: '',
            email: '',
            phone: '',
            address: '',
            previousSchool: '',
            message: ''
          });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
    }
    
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
      <header className=" shadow-sm pt-20 md:pt-0">
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
              <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-between">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-3">
            <School className="w-16 h-16 text-blue-600" />
            <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-100">Pranami Global School</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center space-x-6 md:text-lg text-gray-200">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1 234 567 8900</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>admissions@pranamiglobal.edu</span>
            </div>
          </div>
        </div>
              </div>
            </div>

        </div>
      </header>
       
      </header>

      <main className="default_m mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Admission Inquiry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student's Full Name</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gradeApplying" className="block text-sm font-medium text-gray-700">Grade Applying For</label>
                <select
                  id="gradeApplying"
                  name="gradeApplying"
                  value={formData.gradeApplying}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="Pre-K">Pre-K</option>
                  <option value="Kindergarten">Kindergarten</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">Parent's Name</label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700">Previous School (if any)</label>
                <input
                  type="text"
                  id="previousSchool"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>

          {/* Information Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Pranami Global School?</h3>
              <div className="prose prose-blue">
                <ul className="space-y-4 text-gray-600">
                  <li>Excellence in Academic Programs</li>
                  <li>State-of-the-art Infrastructure</li>
                  <li>Experienced Faculty Members</li>
                  <li>Holistic Development Approach</li>
                  <li>Modern Teaching Methodologies</li>
                  <li>Safe and Nurturing Environment</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <span>123 Education Street, Academic District, City, State 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>+1 234 567 8900</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>admissions@pranamiglobal.edu</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>www.pranamiglobal.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdmissionInquiryForm;