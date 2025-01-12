import React, { useEffect, useState } from 'react'
import axios from 'axios'; // Make sure axios is imported
import StaffCard from '../Components/UI/StaffCard';

const StaffsContainer = () => {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/staffs`);
        setStaffData(response.data); // Updated this line
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(staffData);

  return (
    <div className="pt-28 md:default_m md:pt-3">
        <div className="flex flex-col mb-4">
        <h1 className='text-2xl text-center font-bold '>Staff Members</h1>
        <p className="text-center">Meet out staffs </p></div>
      {/* Add a button to open the modal */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full justify-center gap-3 px-8 md:px-16'>
        {staffData.map((staff) => (
          <div key={staff._id}>
            <StaffCard
              full_name={staff.full_name}
              standard={staff.standard}
              image={staff.image}
              age={staff.age}
              faculty={staff.faculty}
            />
          </div>
        ))}
      {/* Add a button to open the modal */}
    </div></div>
  )
}

export default StaffsContainer
