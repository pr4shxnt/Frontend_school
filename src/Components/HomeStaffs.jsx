import React, { useEffect, useState } from 'react'
import axios from 'axios'; // Make sure axios is imported
import StaffCard from './UI/StaffCard';
import { NavLink } from 'react-router-dom';

const HomeStaffs = () => {
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
    <div className="">
{ staffData.length > 0 ?
    <div className='default_m w-full'>
<div className="">
        <div className="">
        <h1 className='header_default '>Staff  <span className="text-[#EB8F41]"> Members</span></h1>
        <p className="subtitle_default mb-8">Meet our staffs serving the school. </p></div>
      {/* Add a button to open the modal */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-8'>
        {staffData.slice(0,4).map((staff) => (
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
    <p className="flex mt-8 flex-row gap-2 justify-end">
        See all the staffs?
<NavLink to="staff">
      <span className="text-purple-900 hover:underline">Click here</span>
    </NavLink>
      </p>

    </div> : "" }</div>
  )
}

export default HomeStaffs
