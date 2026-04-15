import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);
  const [showHeart, setShowHeart] = useState(null);

  // 🔥 Fetch posts
  useEffect(() => {
    axios.get("http://localhost:3000/post/feed", {
      withCredentials: true
    })
      .then((res) => {
        console.log("API DATA:", res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ❤️ Like Handler
  const handleLike = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/post/feed/${id}`,
        {},
        { withCredentials: true }
      );

      // 🔥 Update UI instantly
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id
            ? { ...post, likes: res.data.likes }
            : post
        )
      );

    } catch (err) {
      console.log(err);
    }
  };
  const handleDoubleTap = (postId) => {
    setShowHeart(postId);

    handleLike(postId); // already bana hua function

    setTimeout(() => {
      setShowHeart(null);
    }, 800);
  };

  return (
    <section className='bg-black min-h-screen text-white'>
      <div className='max-w-xl mx-auto pt-24 space-y-8'>

        {posts?.length > 0 ? (
          posts.map((post) => {

            const isLiked = post?.likes?.includes(user?._id) || false;

            return (
              <div
                key={post._id}
                className='bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md'
              >

                {/* 👤 User Header */}
                <div className='flex items-center gap-3 p-4'>
                  <img
                    src={
                      post.userId?.profileImg
                        ? `http://localhost:3000/uploads/${post.userId.profileImg}`
                        : "https://i.pravatar.cc/100"
                    }
                    className='w-10 h-10 rounded-full object-cover'
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
                </div>

                {/* 📸 Post Image */}
                {/* <img
                  className='w-full max-h-[450px] object-cover'
                  src={post.image}
                  alt="post"
                /> */}

                <div
                  className="relative"
                  onDoubleClick={() => handleDoubleTap(post._id)}
                >
                  <img
                    className="w-full max-h-[450px] object-cover"
                    src={post.image}
                    alt="post"
                  />

                  {/* ❤️ Heart Animation */}
                  {showHeart === post._id && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-7xl animate-heart">
                        ❤️
                      </span>
                    </div>
                  )}
                </div>

                {/* ❤️ Like Button */}
                <div className='p-4 flex items-center gap-4'>
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`text-2xl transition ${isLiked ? "text-red-500 scale-110" : "text-gray-400"
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
    </section>
  );
};

export default Feed;