import React, { useEffect, useState } from 'react';
import { BellRing, Calendar, LucideUniversity, MapPin } from 'lucide-react';
import axios from 'axios';

export function EventsClient() {
  const [events, setEvents] = useState([])


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/events`);
          setEvents(response.data); // Updated this line
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

  })

  console.log(events);


  return (
    <div className="">
    { events.length > 0 ?
    <div className="bg-white">
      <div className=" default_m lg:px-">
        <div className="mx-auto mb-8 text-start w-full lg:mx-0">
          <h1 className="header_default ">
            Upcoming <span className="text-[#EB8F41]"> Events</span>
          </h1>
          <p className="mt-3 subtitle_default">
            Stay updated with the latest happenings, achievements, and announcements from our
            school community.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (

            <div key={event.id} className="flex flex-col hover:scale-105 hover:shadow-2xl transition-all cursor-pointer duration-500 ease-in-out shadow-xl rounded-lg items-start">
              <div className="relative w-full ">
                <img
                  src={`${import.meta.env.VITE_BACKEND_API_URI}/uploads/events_list/${event.image}`}
                  alt={event.title}
                  className="aspect-[16/9] rounded-t-lg w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <div className="w-full py-4 px-5">
                <div className="flex items-center my-2 justify-between gap-x-4 text-xs">
                <p className=" text-orange-500 flex ">
                    <Calendar className="mr-1.5 inline-block h-4 w-4" />
                    Date: {new Date(event.date).toLocaleDateString("en-CA")}</p>

                <div className="">
                    {event.status === "Upcoming" ? <h1 className="flex text-gray-500 "><BellRing className="mr-1.5 inline-block h-4 w-4"/> Upcoming</h1> : <h1 className="flex items-center text-orange-500 gap-1"> <LucideUniversity  className="mr-1.5 inline-block h-4 w-4"/> Streaming Now</h1>}
                </div>
                </div>
                <div className="group relative">

                  <h3 className="mt-1 text-lg font-semibold leading-6 text-gray-600">

                      <span className="absolute flex inset-0" />
                      {event.title}

                  </h3>

                  <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600 ">
                    {event.description}
                  </p>
                  <span className="flex gap-1 text-sm w-full bg-pink-100 p-2 mt-2 rounded-md justify-center items-center"><MapPin/> {event.location} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> : "" }

    </div>
  );
}
