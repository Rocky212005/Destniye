import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../components/sidebar/Sidebar';
import ChatBox from '../../components/ChatBox';
import { FaBell } from 'react-icons/fa';

const Feed = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [posts, setPosts] = useState([]);
  const [showHeart, setShowHeart] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  // 🔥 Fetch posts
  useEffect(() => {
    axios.get("http://localhost:3000/post/feed", {
      withCredentials: true
    })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ❤️ Like
  const handleLike = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/feed/${id}`,
        {},
        { withCredentials: true }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === id
            ? { ...post, likes: res.data.likes }
            : post
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  // ❤️ Double Tap
  const handleDoubleTap = (postId) => {
    setShowHeart(postId);
    handleLike(postId);

    setTimeout(() => {
      setShowHeart(null);
    }, 800);
  };

  // 👥 Follow
  const handleFollow = async (userId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/user/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      // update posts UI
      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p.userId._id === userId) {

            const isFollowing = p.userId.followers?.includes(user._id);

            return {
              ...p,
              userId: {
                ...p.userId,
                followers: isFollowing
                  ? p.userId.followers.filter(id => id !== user._id)
                  : [...(p.userId.followers || []), user._id]
              }
            };
          }
          return p;
        })
      );

      // update logged user
      setUser((prev) => {
        const isFollowing = prev.following?.includes(userId);

        const updatedUser = {
          ...prev,
          following: isFollowing
            ? prev.following.filter(id => id !== userId)
            : [...(prev.following || []), userId]
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className='flex flex-col md:flex-row bg-black min-h-screen text-white overflow-x-hidden'>

      {/* Sidebar */}
      <Sidebar openChat={() => setOpenChat(true)} />

      {/* Feed */}
      <div className='w-full max-w-xl mx-auto px-3 sm:px-4 pt-20 pb-20 md:pt-24 space-y-6 md:space-y-8'>

        {posts?.length > 0 ? (
          posts.map((post) => {

            const isLiked = post?.likes?.includes(user?._id) || false;

            return (
              <div
                key={post._id}
                className='bg-slate-900 rounded-xl overflow-hidden border  border-slate-800 shadow-md'
              >

                {/* 👤 Header */}
                <div className='flex items-center gap-3 p-3 sm:p-4'>

                  <img
                    src={
                      post.userId?.profileImg
                        ? `${import.meta.env.VITE_API_URL}/uploads/${post.userId.profileImg}`
                        : "https://i.pravatar.cc/100"
                    }
                    className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover'
                    alt="user"
                  />

                  <div>
                    <h4 className='font-semibold'>
                      {post.userId?.fullName}
                    </h4>
                    <p className='text-xs text-gray-400'>
                      {post.caption}
                    </p>
                  </div>

                  {/* Follow Button */}
                  {post.userId?._id !== user?._id && (
                    <button
                      onClick={() => handleFollow(post.userId._id)}
                      className={`ml-auto px-3 py-1 text-sm rounded-lg transition ${
                        post.userId?.followers?.includes(user._id)
                          ? "bg-gray-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {post.userId?.followers?.includes(user._id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}

                </div>

                {/* 📸 Image */}
                <div
                  className="relative"
                  onDoubleClick={() => handleDoubleTap(post._id)}
                >
                  <img
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[450px] object-cover"
                    src={post.image}
                    alt="post"
                  />

                  {/* ❤️ Heart */}
                  {showHeart === post._id && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-7xl animate-heart">
                        ❤️
                      </span>
                    </div>
                  )}
                </div>

                {/* ❤️ Like */}
                <div className='p-3 sm:p-4 flex items-center gap-3 sm:gap-4'>
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`text-2xl transition ${
                      isLiked
                        ? "text-red-500 scale-110"
                        : "text-gray-400"
                    }`}
                  >
                    ❤️
                  </button>

                  <span className='text-sm'>
                    {post?.likes?.length || 0} likes
                  </span>
                </div>

              </div>
            );
          })
        ) : (
          <h1 className='text-center text-gray-400'>No posts here</h1>
        )}

      </div>

      {/* 🔔 Floating Button */}
      <div>
        <button
          onClick={() => setOpenChat(true)}
          className="
            fixed 
            top-4 right-4 
            md:top-auto md:bottom-5 md:right-5
            bg-gradient-to-r from-red-500 to-purple-600 
            text-white p-3 sm:p-4 
            rounded-full shadow-lg z-50
          "
        >
          <FaBell />
        </button>

        {openChat && <ChatBox close={() => setOpenChat(false)} />}
      </div>

    </section>
  );
};

export default Feed;