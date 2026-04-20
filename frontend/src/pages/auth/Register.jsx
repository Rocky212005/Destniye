import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function Register() {
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("fullName", e.target.fullName.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        formData.append("profileImg", e.target.profileImg.files[0]);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/user/register`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log(response.data);
            navigate("/");

        } catch (err) {
            console.log(err.response?.data); // 👈 REAL ERROR

            alert(err.response?.data?.message || "Something went wrong");
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

                <header className="mb-4">
                    <h1 className="text-2xl font-semibold text-white">
                        Create your account
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Join to explore and enjoy delicious meals.
                    </p>
                </header>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>

                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <label className="cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
                                {preview ? (
                                    <img
                                        src={preview}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">
                                        Upload
                                    </span>
                                )}
                            </div>
                            <input
                                type="file"
                                name="profileImg"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) =>
                                    setPreview(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                }
                            />
                        </label>
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Name</label>
                        <input
                            name="fullName"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 text-white outline-none"
                            placeholder="Jane"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 text-white outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700 text-white outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                        Sign Up
                    </button>
                </form>

                <div className="text-sm text-gray-400 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400">
                        Sign in
                    </Link>
                </div>

            </div>
        </div>
    );
}