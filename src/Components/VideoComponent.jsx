import React from 'react'

import { Pause } from 'lucide-react';

const VideoComponent = () => {
  return (
    <div>
        <div className="mt-10">
        <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Moment of <span className="text-[#EB8F41]"> Appreciation</span> </h1>
        <p className="text-gray-700">
          Discover what makes our school unique and a great place for your
          child’s education.
        </p>
      </div>
            <div className="px-2 md:px-10 ">
                <video className='rounded-3xl' loop muted autoPlay src="">

                </video>
            </div>
        </div>
    </div>
  )
}

export default VideoComponent
