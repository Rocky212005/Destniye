import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` z-50 transition-all duration-500 ease-out sticky top-0
      ${scrolled
          ? "top-4 left-0 right-0 mx-auto max-w-5xl bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-full py-2 border border-blue-400/30 scale-[0.98]"
          : "top-0 left-0 w-full bg-transparent py-5"
        }`}
    >
      <div className="px-6 md:px-27 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo/destiny.png"
            alt="Destiny"
            className={`transition-all duration-500
            ${scrolled ? "h-16 w-16" : "h-20 w-20"}
            `}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white font-medium">
          <Link className="hover:text-blue-400 transition">Home</Link>
          <Link className="hover:text-blue-400 transition">Explore</Link>
          <Link className="hover:text-blue-400 transition">BucketList</Link>
          <Link className="hover:text-blue-400 transition">Profile</Link>
        </div>

        {/* Button */}
        <Link
          to="/login"
          className={`hidden md:block bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-full transition-all duration-500
          ${scrolled ? "px-3 py-1 text-sm" : "px-4 py-2"}
          `}
        >
          Start the Journey
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 mx-4 text-white space-y-4 shadow-lg">
          <Link className="block">Home</Link>
          <Link className="block">Explore</Link>
          <Link className="block">BucketList</Link>
          <Link className="block">Profile</Link>

          <Link
            to="/login"
            className="block text-center bg-gradient-to-r from-red-500 to-purple-600 px-4 py-2 rounded-full"
          >
            Start the Journey
          </Link>
        </div>
      )}
    </nav>
  );
}