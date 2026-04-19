import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/user/logout", {
                withCredentials: true
            })

            localStorage.removeItem("user")

            navigate("/login")
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <button
            onClick={handleLogout}
            className="flex w-full bg-slate-800  rounded-2xl items-center gap-3 hover:text-red-400"
        >
        Logout
        </button>
    )
}

export default Logout