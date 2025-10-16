import React from 'react'
import { Link } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6"

const Sidebar = ({ data }) => {
  return (
    <div className='bg-zinc-800 rounded-2xl p-6 flex flex-col items-center h-full shadow-lg shadow-zinc-950/40'>
      {/* Profile Info */}
      <div className='flex flex-col items-center'>
        <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-600 shadow-md'>
          <img 
            src={data.avater} 
            alt="User Avatar" 
            className='w-full h-full object-cover'
          />
        </div>
        <p className='mt-3 text-xl font-semibold text-zinc-100'>
          {data.username}
        </p>
        <p className='mt-1 text-sm text-zinc-400'>
          {data.email}
        </p>
        <div className='w-full mt-5 h-[1px] bg-zinc-700'></div>
      </div>

      {/* Navigation Links */}
      <div className='w-full flex flex-col mt-6 space-y-3'>
        <Link
          to="/profile"
          className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300"
        >
          Favourites
        </Link>

        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300"
        >
          Settings
        </Link>
      </div>

      {/* Logout Button */}
      <button className='mt-auto bg-zinc-900 w-full py-2.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:bg-zinc-950 transition-all duration-300'>
        Log Out <FaArrowRightFromBracket className="text-lg" />
      </button>
    </div>
  )
}

export default Sidebar
