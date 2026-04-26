import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const cities = [
    { name: "Paris", country: "France", img: "https://www.shutterstock.com/image-photo/old-city-tallinn-estonia-baltic-600nw-2744735385.jpg" },
    { name: "Tokyo", country: "Japan", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGDc97UNV_VZUgONPGyI25HWxtyW7eSf58g&s" },
    { name: "India", country: "mumbai", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuxISIr9cXjaEpauhTfVPIo4jI7uH-DN7erw&s" },
    { name: "Dubai", country: "dubai", img: "https://cdn.britannica.com/93/199193-050-9EA1781A/view-Dubai-foreground-Burj-al-Arab-Hotel-United.jpg" },
  ];

  const navigate = useNavigate()
  const handleStart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/feed");   // already logged in
    } else {
      navigate("/login");  // not logged in
    }
  };
  return (
    <div className="bg-slate-950 text-white font-[Poppins] animate-page">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center pt-">
        <img
          src="https://media.gettyimages.com/id/607582346/video/camera-and-me.jpg?s=640x640&k=20&c=uXkLIiKgdWV6u-v8thLUvy3n1UvNuKSjMXNvaEnq4WU="
          className="absolute w-full h-full object-cover opacity-50"
        />

        <div className="relative text-center px-6 animate-smooth">
          <h1 className="text-5xl font-bold 
          bg-gradient-to-r from-red-500 to-purple-600 
          bg-clip-text text-transparent md:text-8xl 
          tracking-wide mb-4">
            Destiny
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            Explore the world & build your travel story
          </p>

          <button onClick={handleStart} className="bg-gradient-to-r from-red-500 to-purple-600 px-8 py-3 rounded-full transition hover:scale-105">
            Start Exploring
          </button>
        </div>
      </section>

      {/* Cities Section */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-semibold mb-12 text-center animate-smooth">
          Discover Cities
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {cities.map((city, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 0.15}s` }}
              className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-smooth"
            >
              <img
                src={city.img}
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <h3 className="text-3xl font-semibold text-white transform translate-y-5 group-hover:translate-y-0 transition duration-500">
                  {city.name}
                </h3>
              </div>

              <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/40 rounded-2xl transition"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback */}
      <section className="bg-black py-20 px-6 animate-smooth">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">
            Share Your Feedback
          </h2>

          <form className="space-y-4 text-left">
            <input
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Your experience..."
              className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg transition hover:scale-[1.02]">
              Submit
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}