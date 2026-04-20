import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/post/feed`, {
      withCredentials: true
    }).then((res) => {
      const myPost = res.data.posts.filter(
        (post) => post.userId?._id === user?._id
      );
      setPosts(myPost)
    }).catch(
      (err) => console.log(err)
    )
  }, [])
  const navigate = useNavigate();
  // const isFollowing=post.userId.followers?.includes(user._id)
  return (
    <>

      <section className='relative bg-black min-h-screen text-white pt-20 px-4 flex flex-col items-center'>

        {/* User Info */}
        <div className='w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-6 mb-10'>
          <button

            onClick={() => navigate("/feed")}
            className="absolute top-4 left-4  px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            ← Back
          </button>
          <img
            src={
              user?.profileImg
                ? `${import.meta.env.VITE_API_URL}/uploads/${user.profileImg}`
                : "https://i.pravatar.cc/150"
            }
            alt="profile"
            className='w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-700'
          />

          <div className='text-center md:text-left'>
            <h2 className='text-xl md:text-2xl font-semibold'>
              {user?.fullName}
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              {user?.email}
            </p>

            <div className='flex justify-center md:justify-start gap-6 mt-3 text-sm'>
              <span><b>{posts.length}</b> posts</span>
              <span><b>{user?.followers?.length || 0}</b> followers</span>
              <span><b>{user?.following?.length || 0}</b> following</span>
            </div>
          </div>
        </div>

        {/* Tabs / Actions */}
        <div className="w-full max-w-2xl flex justify-between gap-2 mb-6">

          {/* <button onClick={()=>{
            handleFollow(post.userId._id)
          }} className="flex-1 text-center font-semibold hover:cursor-pointer bg-blue-800 py-2 rounded-xl">
            {isFollowing ? "Following":"Follow"}
          </button> */}


          <Link to="/create-post" className="flex-1 bg-gray-800 py-2  rounded-xl hover:bg-gray-600 transition">Create Post</Link>
        </div>

        {/* Posts Grid */}
        <div className='w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3'>
          {posts.length > 0 ? (
            posts.map((post) => (
              <img
                key={post._id}
                src={post.image}
                alt="post"
                className='w-full h-32 sm:h-40 md:h-52 object-cover rounded-lg hover:scale-105 transition'
              />
            ))
          ) : (
            <p className='text-gray-400 col-span-full text-center'>
              No posts here
            </p>
          )}
        </div>

      </section>

    </>
  )
}

export default Profile