import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {

  const [Values, setValues] = useState(
    {
      username: "",
      email: "",
      password: "",
      address: ""
    }
  )

  const navigate = useNavigate()

  

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required")
      }else{
        const response = await axios.post("http://localhost:3000/api/v1/sign-up", Values);
        alert(response.data.message);
        navigate("/Login")
        
        
      }

    } catch (error) {

      alert(error.response.data.message);


    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-6">
      <form className="bg-zinc-800 p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl text-zinc-200 font-semibold">Sign Up</h2>

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
          <label htmlFor="email" className="text-zinc-400 text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 p-2 rounded bg-zinc-900 text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700"
            required
            value={Values.email}
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

        <div>
          <label htmlFor="address" className="text-zinc-400 text-sm">Address</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            placeholder="Your address"
            className="w-full mt-1 p-2 rounded bg-zinc-900 text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700"
            required
            value={Values.address}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-zinc-700 text-white py-2 rounded hover:bg-zinc-600"
          onClick={submit}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
