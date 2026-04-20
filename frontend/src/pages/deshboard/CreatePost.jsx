import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const navigate=useNavigate()
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [location, setLocation] = useState("")
    const [caption, setCaption] = useState("")
    const [placeName, setPlaceName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleImage=(e)=>{
         const file=e.target.files[0];
         if(file){
            setImage(file)
            setPreview(URL.createObjectURL(file))
         }

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!image){
            alert("plese select image")
            return 
        }
        const formData=new FormData()
        formData.append("image",image)
        formData.append("caption",caption)
        formData.append("location",location)
        formData.append("placeName",placeName)
       try{
         setLoading(true)
         await axios.post(`${import.meta.env.VITE_API_URL}/post/create-post`,formData,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            } 
         })
         alert("post created succesfully" )
         navigate("/feed")
       }catch(err){
        console.log(err)
        alert("upload file worng")
       }finally{
        setLoading(false)
       }
    }
  return (
       <section className='bg-black min-h-screen text-white flex items-center justify-center px-4'>
           <button

            onClick={() => navigate("/feed")}
            className="absolute top-4 left-4  px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            ← Back
          </button>
      <div className='bg-slate-900 p-6 rounded-2xl w-full max-w-md shadow-lg'>

        <h2 className='text-xl font-semibold mb-4 text-center'>
          Create Post
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* 📸 Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-sm"
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              className="w-full h-60 object-cover rounded-lg"
            />
          )}

          {/* Caption */}
          <input
            type="text"
            placeholder="Write caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 outline-none"
          />


          {/* Location */}
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 outline-none"
          />
          {/* Place */}
          <input
            type="text"
            placeholder="Place name..."
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : "Share Post"}
          </button>

        </form>

      </div>

    </section>
   
  )
}

export default CreatePost