import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdmissionInquiryAdminController = () => {
    const [admissionInquiryData, setAdmissionInquiryData] = useState([])


    const fetchAdmissionInquiryData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/admissionInquiry`)
            setAdmissionInquiryData(response.data)
        } catch (error) {
            console.error(error)
        }}
  return (
    <div>
        <h1>Admission Inquiry Admin</h1>
        <div>
            {admissionInquiryData.map((admissionInquiry) => (
            <div key={admissionInquiry.id}>
                <p>{admissionInquiry.name}</p>
                <p>{admissionInquiry.email}</p>
                <p>{admissionInquiry.phone}</p>
                <p>{admissionInquiry.message}</p>

                <button>

                    <a href={`mailto:${admissionInquiry.email}`} className="">{admissionInquiry.email}</a>
                </button>
            </div>
            ))}
        </div>
    </div>
  )
    }

export default AdmissionInquiryAdminController