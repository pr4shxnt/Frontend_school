import React from 'react';

export function Card({ title, value, color, icon}) {
  return (
    <div className="flex w-full flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <div className="flex flex-col items-center  ">
        <div className={` p-2 rounded-full text-orange-500 bg-orange-100`}>
          {icon} 
        </div> <p className="text-xl font-semibold text-gray-900">{value}</p>
        <div className='w-full text-center'>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
         
        </div>
      </div>
    </div>
  );
}

