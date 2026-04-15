import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const Login = () => {
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
          const email = e.target.email.value;
          const password = e.target.password.value;
          
          const response=await axios.post("http://localhost:3000/api/auth/user/login",{
            email,
            password
          },{
            withCredentials:true
          })
          console.log(response.data)
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/feed");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

                <header className="mb-4">
                    <h1 className="text-2xl font-semibold text-white">
                        Welcome back
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Sign in to continue your food journey.
                    </p>
                </header>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 text-white outline-none"
                        />
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                        Sign In
                    </button>

                </form>

                <div className="text-sm text-gray-400 mt-4 text-center">
                    New here?{" "}
                    <Link to="/register" className="text-blue-400">
                        Create account
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login