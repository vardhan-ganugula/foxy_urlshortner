import React, { useState } from 'react'
import { IoMdLock } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

import bgImg from '../assets/logo.png';

function Main() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');



  return (
    <main>
      <section className='w-full h-screen p-2 flex flex-col items-center bg-slate-50 relative'>
        <div className='relative h-full w-full'>
          <img src={bgImg} alt="" className='w-[500px] absolute top-40 -left-1 opacity-50 -translate-x-1/2' />
          <img src={bgImg} alt="" className='w-[150px] absolute top-40 md:right-40 opacity-50 rotate-[30deg] right-5' />
        </div>
        <div className='absolute left-0 top-0 w-full h-full'>
          <div className='flex justify-center'>
            <div className='md:w-3/5 text-center'>
            <h1 className='md:text-5xl font-bold mt-[80px] text-2xl'>Make Every Connection Count</h1>
            <h2 className='mt-5 font-mono text-sm md:text-lg px-5'>
              Create short links,share them anywhere. Track what's working.
              and what's not. All inside the <b>FoxyURL Connection platform.</b>
            </h2>
            </div>
          </div>
          <div className='mt-5 py-5 flex flex-col justify-center items-center px-2 '>
            <div className=' mt-5'>
              <div className='flex justify-center text-xs font-bold'>
                <div className='py-3 bg-white px-5 rounded-t-md shadow-[0px_-2px_2px_rgba(0,0,0,0.09)] flex'>
                  Shorten Link <FaLink className='ml-3' size={15} />
                </div>
                <div className='py-3 bg-transparent px-5 rounded-t-md '>
                  <a href="#" className='flex'>Dashboard <FaTools className='ml-3' size={15} /> </a>
                </div>
              </div>
              <div className='bg-white w-full md:w-[500px] md:py-5 rounded-md md:px-5 shadow-md p-2'>
                <form action="#" autoComplete='off' className='w-full'>
                  <div className='md:px-5 px-3 font-bold'>
                    <label htmlFor="url" className='text-sm font-bold'>Paste a long URL</label>
                    <input type="url" id='url' name='url' className='w-full py-2 px-3 border-2 border-orange-200 rounded-md mt-2 outline-none focus:border-orange-400 text-md font-mono' placeholder='Example: https://google.com' value={url} onChange={(e) => { setUrl(e.target.value) }} />
                  </div>
                  <div className='flex items-center md:py-5 md:px-5 justify-center flex-col md:flex-row px-3 mb-3'>
                    <div className='flex flex-col font-bold text-sm relative w-full md:w-auto '>
                      <label htmlFor="domain" className='py-2'>Domain</label>
                      <input type="text" id='domain' disabled value="coderealm.tech" className='cursor-not-allowed bg-slate-100 font-mono text-slate-800 p-3 rounded-lg ' unselectable="on" />
                      <IoMdLock className='absolute bottom-4 right-3' />
                    </div>
                    <div className='mt-5 pt-5 text-xs hidden md:block mx-3'> / </div>
                    <div className='flex flex-col font-bold text-sm w-full md:w-auto'>
                      <label htmlFor="alias" className='py-2'>Alias</label>
                      <input type="text" id='alias' className='bg-white font-mono text-slate-800 px-3 py-2 rounded-lg border-2 border-orange-200 outline-none focus:border-orange-400' value={alias} onChange={(e) => { setAlias(e.target.value) }} placeholder='mylink' />
                    </div>
                  </div>
                  <div>
                    <p className='text-xs px-5'>By clicking Shorten URL, you agree to FoxyURL's <a href="#" className='decoration-2 underline decoration-orange-300 underline-offset-4'>Terms of Use, policy</a>
                    </p>
                  </div>
                  <div className={`mx-5 mt-5 overflow-hidden ${shortUrl ? 'h-auto block' : 'h-0 hidden'} `}>
                    <div className='relative w-full h-full'>
                      <input type="url" disabled value={shortUrl} id='shorturl' className='border-2 border-orange-300 w-full py-2 px-3 rounded-md font-mono test-sm tracking-tight' />
                      <div className='absolute top-1/2 right-2 font-bold -translate-y-1/2 cursor-pointer text-orange-400'>
                          <IoCopyOutline size={25} />
                      </div>
                    </div>
                  </div>
                  <div className='p-5'>
                    <button type="submit" className='text-sm font-mono text-center w-full bg-orange-400 text-white py-3 cursor-pointer rounded-md' >Shorten URL</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main
