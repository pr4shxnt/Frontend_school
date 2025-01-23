import React from 'react';
import { Users, Palette, Trophy, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function CampusLifePage() {
  const activities = [
    {
      icon: Users,
      name: 'Student Clubs',
      description: 'Join diverse clubs and organizations that match your interests.',
    },
    {
      icon: Palette,
      name: 'Arts & Culture',
      description: 'Express yourself through music, theater, and visual arts programs.',
    },
    {
      icon: Trophy,
      name: 'Athletics',
      description: 'Compete in various sports teams and intramural activities.',
    },
    {
      icon: Heart,
      name: 'Community Service',
      description: 'Make a difference through volunteer opportunities and outreach programs.',
    },
  ];

  return (
    <div className="  default_m">
      <div className="">
      <div className="  text-center w-full mb-8">
          <h1 className="header_default">
            Campus <span className="text-[#EB8F41]"> Life</span>
          </h1>
          <p className="subtitle_default text-start">
            Experience a vibrant community where learning extends beyond the classroom.

          </p>
        </div>

        <div className="mx-auto  lg:max-w-none">
          <dl className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => (
              <div key={activity.name} className="flex hover:shadow-2xl bg-pink-100 transition-all duration-500 hover:scale-105 cursor-pointer shadow-gray-600 p-5 rounded-xl flex-col">
                <div className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <activity.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {activity.name}
                </div>
                <div className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{activity.description}</p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="w-full cursor-pointer items-center flex justify-end gap-2 mt-6">
      <p className="">
        Are you a student?

      </p>
      <NavLink to="students-card">
      <span className="text-purple-900 hover:underline">Click here</span>
    </NavLink>
    </div></div>
  );
}
