import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlusSquare, FaUser, FaEnvelope } from "react-icons/fa";

const MobileSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/feed", icon: <FaHome /> },
    { path: "/create-post", icon: <FaPlusSquare /> },
    { path: "/messages", icon: <FaEnvelope /> },
    { path: "/profile", icon: <FaUser /> },
  ];

  return (
    <>
      {/* 🔥 TOP NAV */}
      <div className="fixed top-0 left-0 w-full h-14 bg-black border-b border-slate-800 flex items-center px-4 z-50 md:hidden">
        <img
          className="h-10 w-10 object-contain"
          src="/logo/destiny.png"
          alt="logo"
        />
        <h1 className="ml-2 text-lg font-bold text-white">Destiny</h1>
      </div>

      {/* 🔥 BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-slate-800 flex justify-around items-center py-3 z-50 md:hidden">
        {navItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <div
              className={`text-xl ${
                location.pathname === item.path
                  ? "text-pink-500 scale-110"
                  : "text-white"
              } transition`}
            >
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MobileSidebar;