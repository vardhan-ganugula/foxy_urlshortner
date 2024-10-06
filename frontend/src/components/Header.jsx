import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from 'react-icons/io';


function Header({hideAlert = false, navlinks, hideLogins = false}) {
  const [isMobileClose, setMobileNavigation] = useState(true);
  
  function closeParent(){
    document.querySelector('#closeParent').style.display = 'none';
  }
  return (
    <header className='bg-white w-full py-1  px-5 border-b-2'>
      { !hideAlert && <div className='w-full py-2 flex justify-center border-b-2 text-xs relative' id='closeParent'>
        <div className="absolute right-0 top-1 md:top-0 md:right-2 py-1 px-2 cursor-pointer" onClick={ (e)=> closeParent()}>
          <IoIosClose size={25}/>
        </div>
          <div className='px-2'>
            <h6> Create a free acount and enjoy extra features -  <strong> <span className='text-indigo-600'> ip tracing </span>, <span className='text-orange-500'>location</span></strong> </h6>
          </div>
      </div>}
      <nav className='flex justify-between items-center'>

        <a href="#" className='w-[60px] h-[60px] flex gap-1 items-center font-bold'> <img src={logo} alt="logo" /> FoxyURL </a>
        {/* large screen navigation */}

        <div className='ml-28 hidden lg:flex'>
          <ul className='flex gap-4'>

            {
              navlinks.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.link} className='navlink' >
                    {item.name}
                  </NavLink> </li>
              ))
            }

          </ul>
        </div>

        {/* mobile navigation */}
        <div className={`w-full h-full bg-orange-50/50 fixed ${isMobileClose ? '-left-full' : 'left-0'} z-20 top-0 transition-all duration-500`}>
          <div className='w-[250px] h-full bg-orange-100 relative flex justify-center p-5 items-center'>

            <div className='bg-transparent top-5 right-5 absolute cursor-pointer' onClick={() => setMobileNavigation(!isMobileClose)}>
              <IoCloseSharp className='text-3xl' />
            </div>

            <div>
              <ul className='flex flex-col gap-5'>
                {
                  navlinks.map((item, index) => (
                    <li key={index}>
                      <NavLink to={item.link} className='navlink before:-bottom-2' >
                        {item.name}
                      </NavLink> </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='text-3xl cursor-pointer font-thin block lg:hidden' onClick={() => setMobileNavigation(!isMobileClose)}>
          { isMobileClose? <RxHamburgerMenu/> : <IoCloseSharp/>}
        </div>

        {!hideLogins && <div className='gap-3 hidden lg:flex'>
          <Link to='/login' className='px-3 py-[8px] text-xs font-semibold border-[2px] border-orange-500 rounded-lg bg-orange-100/30 text-orange-500 hover:bg-orange-500 hover:text-white transition-all'>Login</Link>
          <Link to='/signup' className='px-3 py-[8px] text-xs font-semibold border-[2px] border-orange-500 rounded-lg bg-orange-500 text-white hover:bg-orange-100/30 hover:text-orange-500 transition-all'>Sign up</Link>
        </div>}
      </nav>

    </header>
  )
}

export default Header
