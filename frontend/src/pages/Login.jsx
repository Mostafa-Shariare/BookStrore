import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { authActions } from "../store/auth"
import { useDispatch } from "react-redux"

const Login = () => {

  const [Values, setValues] = useState(
    {
      username: "",
      password: "",

    }
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required")
      }else{
        const response = await axios.post("http://localhost:3000/api/v1/sign-in", Values);
        console.log(response.data.id);
        
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)                       
        
        navigate("/Profile")
        
        
      }

    } catch (error) {

      alert(error.response.data.message);


    }
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 px-4 py-10">
      <form className="w-full max-w-md bg-white border border-amber-100 rounded-2xl px-6 py-7 flex flex-col gap-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl text-slate-900 font-semibold tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-600">
            Sign in to continue exploring and managing your favourite books.
          </p>
        </div>

        <div>
          <label htmlFor="username" className="text-slate-500 text-xs font-medium uppercase tracking-wide">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className="w-full mt-1 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition-colors"
            required
            value={Values.username}
            onChange={change}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-slate-500 text-xs font-medium uppercase tracking-wide">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition-colors"
            required
            value={Values.password}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="mt-1 bg-amber-500 text-amber-950 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors duration-200 shadow-sm"
          onClick={submit}
        >
          Login
        </button>

        <p className="text-xs text-slate-500 text-center mt-1">
          Don&apos;t have an account?{" "}
          <Link to="/Signup" className="text-amber-700 hover:text-amber-600 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
