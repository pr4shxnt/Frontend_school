import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ReviewedBlogs = () => {
    const [reviewedBlogs, setReviewedBlogs] = useState([])

    useEffect(() => {
      const fetchedData = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/reviewed`);
            setReviewedBlogs(response.data);
          } catch (error) {
            console.error('Error fetching blogs:', error);
          }}

fetchedData()
    }, [])

    console.log(reviewedBlogs);


  return (
    <div>

    </div>
  )
}

export default ReviewedBlogs
