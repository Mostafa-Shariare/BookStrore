import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from "react-router-dom"
import axios from "axios"

const Profile = () => {
  const [Profile, setProfile] = useState();

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-user-information", 
          { headers }
        )
        setProfile(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  return (
    <div className='bg-zinc-900 px-4 md:px-10 lg:px-16 flex flex-col md:flex-row h-screen py-8 gap-6 text-white'>
      {!Profile ? (
        <div className='flex items-center justify-center w-full text-zinc-400 text-lg font-medium'>
          Loading...
        </div>
      ) : (
        <>
          <div className='md:w-1/4 lg:w-1/5'>
            <Sidebar data={Profile} />
          </div>
          <div className='flex-1 bg-zinc-800 rounded-2xl p-4 md:p-6 overflow-y-auto'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
