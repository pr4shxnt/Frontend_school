import React from 'react';

export function Card({ title, value,color, icon}) {
  return (
    <div className="flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div className={` p-2 rounded-full  bg-gray-100`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
