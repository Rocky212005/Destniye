import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";

const Destination = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // ✅ track search

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    try {
      setLoading(true);
      setSearched(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/place?city=${city}`,
        { withCredentials: true }
      );

      setPlaces(res.data.places || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white font-[Poppins] min-h-screen">

      <Navbar/>
      
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center ">
        <img
          src="/logo/destniy.jpg"
          alt="travel"
          className="absolute w-full h-[120vh] object-cover opacity-40"
        />

        <div className="relative flex flex-col items-center px-4 top-20 text-center">
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Find Your Destiny
          </h1>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="flex gap-3 w-full max-w-md "
          >
            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg text-white  bg-slate-700 outline-none"
            />

            <button
              type="submit"
              className="bg-red-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>

          {/* LOADING */}
          {loading && (
            <p className="text-gray-300 mt-4">
              Loading amazing places...
            </p>
          )}
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-50">
        
        {/* ❌ No Results (only after search) */}
        {!loading && searched && places.length === 0 && (
          <p className="text-center text-gray-400">
            No places found for "{city}"
          </p>
        )}

        {/* ✅ GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:scale-105 transition duration-300"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {place.name}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  {place.description?.slice(0, 90)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destination;