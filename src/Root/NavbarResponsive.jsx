import { ChevronDown } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarResponsive = ({setMenuToggle, menuToggle}) => {
  return (
    <div>
<ul className="flex flex-col bg-[#EB8F41]  text-white text-center  gap-3">

<NavLink to="/"><li onClick={() => {
            setMenuToggle(!menuToggle);
          }} className="cursor-pointer w-full py-2.5  font-semibold  hover:text-gray-300 transition-all ease-in duration-300">Home</li>
          </NavLink>


          <NavLink to="/about"><li onClick={() => {
            setMenuToggle(!menuToggle);
          }} className="cursor-pointer w-full py-2.5  font-semibold  hover:text-gray-300 transition-all ease-in duration-300">About</li>
          </NavLink>

          <NavLink to="/contact"><li onClick={() => {
            setMenuToggle(!menuToggle);
          }} className="cursor-pointer w-full py-2.5  font-semibold  hover:text-gray-300 transition-all ease-in duration-300">Contact</li>
          </NavLink>

          <NavLink to="/gallery"><li onClick={() => {
            setMenuToggle(!menuToggle);
          }} className="cursor-pointer w-full py-2.5  font-semibold  hover:text-gray-300 transition-all ease-in duration-300">Gallery</li>
          </NavLink>



          <NavLink to="/socials"><li onClick={() => {
            setMenuToggle(!menuToggle);
          }} className="cursor-pointer w-full py-2.5  font-semibold  hover:text-gray-300 transition-all ease-in duration-300">Socials</li>
          </NavLink>

</ul>
    </div>
  )
}

export default NavbarResponsive
