import React from 'react'
import Navbar from '../components/Navbar'

const Journal = () => {
  return (
    <div className='  relative bg-black h-screen flex items-center justify-center '>
        <Navbar/>

        <img className=' h-full opacity-50 object-cover absolute w-full ' src="/logo/map.jpg" alt="" />

        <h1 className='text-white md:text-[100px]   font-extrabold text-4xl '>Cooming Soon</h1>
    </div>
  )
}

export default Journal