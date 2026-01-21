import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'


const Sidebar = ({ data }) => {

  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)
  const history = useNavigate()

  return (
    <div className='bg-white border-2 border-emerald-200 rounded-2xl p-6 flex flex-col items-center h-full shadow-lg shadow-emerald-200/20'>
      {/* Profile Info */}
      <div className='flex flex-col items-center'>
        <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-300 shadow-md'>
          <img 
            src={data.avater} 
            alt="User Avatar" 
            className='w-full h-full object-cover'
          />
        </div>
        <p className='mt-3 text-xl font-semibold text-slate-800'>
          {data.username}
        </p>
        <p className='mt-1 text-sm text-slate-600'>
          {data.email}
        </p>
        <div className='w-full mt-5 h-[1px] bg-emerald-200'></div>
      </div>

      {/* Navigation Links */}
      {role === "user" && (
          <div className='w-full flex flex-col mt-6 space-y-3'>
        <Link
          to="/profile"
          className="text-slate-700 font-medium w-full py-2 text-center hover:bg-emerald-50 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-200"
        >
          Favourites
        </Link>

        <Link
          to="/profile/orderHistory"
          className="text-slate-700 font-medium w-full py-2 text-center hover:bg-emerald-50 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-200"
        >
          Order History
        </Link>

        <Link
          to="/profile/add-book"
          className="text-slate-700 font-medium w-full py-2 text-center hover:bg-emerald-50 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-200"
        >
          List My Book
        </Link>

        <Link
          to="/profile/settings"
          className="text-slate-700 font-medium w-full py-2 text-center hover:bg-emerald-50 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-200"
        >
          Settings
        </Link>
      </div>
      )}

      {role === "admin" && (
          <div className='w-full flex flex-col mt-6 space-y-3'>
        <Link
          to="/profile"
          className="text-slate-700 font-medium w-full py-2 text-center hover:bg-emerald-50 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-200"
        >
          All Orders
        </Link>

        <Link
          to="/profile/add-book"
          className="text-slate-700 font-medium w-full py-2 text-center hover:bg-emerald-50 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-200"
        >
          Add Book
        </Link>

        
      </div>
      )}

      {/* Logout Button */}
      <button className='mt-auto bg-red-500 w-full py-2.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-300 shadow-sm'
      onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"))
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        history("/")
      }}
      >
        Log Out <FaArrowRightFromBracket className="text-lg" />
      </button>
    </div>
  )
}

export default Sidebar
