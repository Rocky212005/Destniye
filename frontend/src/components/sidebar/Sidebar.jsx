import React, { useEffect, useState } from 'react'

import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'


const Sidebar = () => {
  const [ismobile, setIsmobile] = useState(window.innerWidth<768)
  const [openChat, setOpenChat] = useState(false);
  useEffect(()=>{
      const handleResize=()=>{
        setIsmobile(window.innerWidth<768)
      }

      window.addEventListener("resize",handleResize)

      return ()=> window.removeEventListener("resize",handleResize)
  },[])
  return (
    <>
       {ismobile ? <MobileSidebar/> :<DesktopSidebar openChat={()=>setOpenChat(true)}/>}
    </>
    
  )
}

export default Sidebar