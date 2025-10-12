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
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-6">
      <form className="bg-zinc-800 p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl text-zinc-200 font-semibold">Login</h2>

        <div>
          <label htmlFor="username" className="text-zinc-400 text-sm">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className="w-full mt-1 p-2 rounded bg-zinc-900 text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700"
            required
            value={Values.username}
            onChange={change}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-zinc-400 text-sm">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 p-2 rounded bg-zinc-900 text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700"
            required
            value={Values.password}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-zinc-700 text-white py-2 rounded hover:bg-zinc-600"
          onClick={submit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
