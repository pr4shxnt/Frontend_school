import React from 'react'

const SocialData =[
    {name: 'Facebook', icon: 'facebook', link: 'https://www.facebook.com/'},
    {name: 'Instagram', icon: 'instagram', link: 'https://www.instagram.com/'},
    {name: 'Twitter', icon: 'twitter', link: 'https://www.twitter.com/'},
    {name: 'LinkedIn', icon: 'linkedin', link: 'https://www.linkedin.com/'},
    {name: 'Youtube', icon: 'youtube', link: 'https://www.youtube.com/'},
    {name: 'Pinterest', icon: 'pinterest', link: 'https://www.pinterest.com/'},
    {name: 'Github', icon: 'github', link: 'https://www.github.com/'},
]

const Socialdropdown = () => {
  return (
    <div className='bg-[#EB8F41] flex flex-col rounded-lg  drop-shadow-2xl shadow-2xl text-white'>
        {
            SocialData.map((data) => (
                <h1 className='px-10 cursor-pointer py-3'>{data.name}</h1>


            ))
        }
    </div>
  )
}

export default Socialdropdown
