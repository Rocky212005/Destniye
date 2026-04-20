import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBell,
  FaEnvelope
} from "react-icons/fa";
import ChatBox from '../ChatBox';
import Logout from '../../pages/auth/Logout';

const DesktopSidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openChat, setOpenChat] = useState(false);
  const [toast, setToast] = useState("");
  const navigate=useNavigate()

  const showToast = (msg) => {
    setToast(msg)
    console.log(msg)
  }
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer)
    }
  }, [toast])
  return (
    <>
    <div className="fixed left-0 top-0 h-screen  w-64 bg-black text-white flex flex-col justify-between p-5 border-r border-slate-800">
      {/* 🔥 Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img
            src="/logo/destiny.png"
            className="w-13 h-14"
            alt="logo"
          />
          <h1 className="text-4xl font-bold   bg-gradient-to-r from-red-500 to-purple-600 
          bg-clip-text text-transparent">Destiny</h1>
        </div>


        {/* 👤 Bottom Section */}
        <div className="  items-center gap-3 mb-8  border-2 border-pink-800 h-45 rounded-2xl border-t pt-4">
          <button onClick={()=>{
            navigate("/profile")
          }} className='px-11 cursor-pointer'>
          <img 
            src={
              user?.profileImg
              
            }
            className="w-30 h-30 mx-auto rounded-full"
            alt="user"
          />

          </button>

          <div className='w-39 mx-15'>
            <h4 className="text-sm font-semibold mx-7">{user?.fullName}</h4>
            <p className="text-xs text-gray-400 ">{user?.email}</p>
          </div>

        </div>

        {/* Menu */}
        <div className="space-y-4">

          <Link to="/feed" className="flex bg-slate-800 p-2 rounded-2xl items-center gap-3 hover:text-blue-400">
            <FaHome className='text-[#fb2b81]' /> <span>Feed</span>
          </Link>

          {/* <Link to="/chat-box" className="flex bg-slate-800 p-2 rounded-2xl  items-center gap-3 hover:text-blue-400">
            <FaEnvelope className='text-green-400' /> <span>Messages</span>
          </Link> */}

          <Link
            onClick={() => setOpenChat(true)}
            className="flex transition transform bg-slate-800 p-2 rounded-2xl items-center gap-3 hover:text-blue-400"
          >
            <FaEnvelope className='text-green-400' />  <span>Messages</span>
          </Link>

          {/* Chat Box */}
          {openChat && <ChatBox close={() => setOpenChat(false)} />}




          {/* <Link onClick={()=> showTost("under development ") 
          }  className="flex bg-slate-800 p-2 rounded-2xl  items-center gap-3 hover:text-blue-400 ">
            <FaBell className='text-yellow-200' /> <span>Notifications</span>
          </Link> */}
          <button
            onClick={() => showToast("🚧 Notifications - Under Development")}
            className="flex w-full bg-slate-800 p-2 rounded-2xl items-center gap-3 hover:text-blue-400"
          >
            <FaBell className='text-yellow-200' /> <span>Notifications</span>
          </button>


           <button
            onClick={() => showToast("🚧 Notifications - Under Development")}
            className="flex w-full bg-slate-800 p-2 rounded-2xl items-center gap-3 hover:text-blue-400"
          >
            <FaCog className='text-yellow-200' /> <span>Setting</span>
          </button>
        
            
          <Link to="/" className="flex bg-slate-800 p-2 rounded-2xl  items-center gap-3 hover:text-blue-400">
            <FaUser className='text-pink-500' /> <span><Logout/></span>
          </Link>
         
          
        </div>
      </div>
      
    </div>
    {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white text-red-600 px-6 py-3 rounded-full shadow-lg z-50">
          {toast}
        </div>
      )}
    </>


  )
}

export default DesktopSidebar