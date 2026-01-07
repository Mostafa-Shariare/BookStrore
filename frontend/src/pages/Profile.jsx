import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"

const Profile = () => {
  const [Profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
    }),
    []
  );

  useEffect(() => {
    // If there is no auth info, send user to login
    if (!headers.id || !localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
      return;
    }

    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-user-information", 
          { headers }
        )
        // If user no longer exists (e.g. after seeding), force re-login
        if (!response.data || !response.data._id) {
          navigate("/Login", { replace: true });
          return;
        }
        setProfile(response.data)
      } catch (error) {
        console.log(error)
        navigate("/Login", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    fetch()
  }, [headers, navigate])

  return (
    <div className='bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 px-4 md:px-10 lg:px-16 flex flex-col md:flex-row h-screen py-8 gap-6 text-slate-900'>
      {loading || !Profile ? (
        <div className='flex items-center justify-center w-full text-zinc-400 text-lg font-medium'>
          Loading...
        </div>
      ) : (
        <>
          <div className='md:w-1/4 lg:w-1/5'>
            <Sidebar data={Profile} />
          </div>
          <div className='flex-1 bg-white rounded-2xl p-4 md:p-6 overflow-y-auto shadow-sm border border-amber-100'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
