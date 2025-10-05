import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  return (
    <div className="bg-zinc-800 text-white px-8 py-3 flex justify-between items-center">
      
      {/* Logo Section */}
      <div>
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition duration-300">
          BookHeaven
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        {links.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="hover:text-blue-400 transition duration-300"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        <Link
          to="/Login"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/Signup"
          className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md transition duration-300"
        >
          Signup
        </Link>
      </div>

    </div>
  );
};
