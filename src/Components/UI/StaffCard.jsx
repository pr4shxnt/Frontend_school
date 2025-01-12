import React from "react";

const StaffCard = ({ full_name, image, age, faculty, standard }) => {
  return (
    <div className="rounded-lg flex items-center flex-col shadow-2xl  gap-1 ">
      <div className="aspect-square">
        <img
          className="w-full rounded-t cursor-pointer h-full object-cover"
          src={`http://localhost:5000/${image}`}
          alt=""
        />
      </div>
      <div className="flex px-1 py-4 gap-1 flex-col bg-white cursor-pointer text-center">
        <h3>
            <span className="font-bold">Name: </span>
           {full_name} ({age})
        </h3>
        {standard?
        <p className="text-orange-500 text-sm">
          Teacher at <span className=""> {standard}
          {standard === 1 ? (
            <sup>st </sup>
          ) : standard === 2 ? (
            <sup>nd</sup>
          ) : standard === 3 ? (
            <sup>rd </sup>
          ) : (
            <sup>th </sup>
          )}
           Standard</span>
        </p>:""}
        {faculty === "Principal" ? <span className="text-orange-500 font-semibold">Principal</span> :
        <p><span className="font-semibold">Subject</span> : {faculty}</p>}
      </div>
    </div>
  );
};

export default StaffCard;
