import React from 'react'

const Profile = () => {
  return (
    <section className='bg-black min-h-screen text-white pt-24 px-6'>
       {/* user info */}

       <div className='max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 mb-10 bg-red-400'>
             <img src="" alt="logo.png" className='w-28 h-28 rounded-full object-cover border-2 border-gray-700' />
             <div className=''>
              <h2 className='text-2xl font-semibold'>Rahul</h2>
              <p className="text-gray-400">mishra@gmail.com</p>
              <div className='flex gap-6 mt-3 text-sm'>
                <span><b>10</b> posts</span>
                <span><b>1030</b> followers</span>
                <span><b>100</b> following</span>
              </div>


             </div>
       </div>
        {/* 📸 Posts Grid */}

        <div className='max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 bg-blue-400'>
             
             <img src="" alt=""  className='w-full h-40 md:h-52 object-cover rounded-lg hover:scale-105 transition'/>

        </div>
    </section>
  )
}

export default Profile