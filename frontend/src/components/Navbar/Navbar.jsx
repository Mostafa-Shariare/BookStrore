import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseLinks = [
    { key: 'home', title: "Home", link: "/" },
    { key: 'all', title: "All Books", link: "/all-books" },
    { key: 'cart', title: "Cart", link: "/cart" },
    { key: 'profile', title: "Profile", link: "/profile" },
    { key: 'admin', title: "Admin Profile", link: "/profile" },
  ]; 

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role)

  let links = baseLinks.filter((item) => {
    if (!isLoggedIn) {
      // hide cart and profile when logged out
      return item.key !== 'cart' && item.key !== 'profile' && item.key !== 'admin';
    }
    if (role === 'user') {
      // hide admin link for normal users
      return item.key !== 'admin';
    }
    if (role === 'admin') {
      // hide user profile link if admin has its own
      return item.key !== 'profile';
    }
    return true;
  });
  

  return (
    <nav className="bg-zinc-800 text-white px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-400 transition duration-300"
        >
          BookHeaven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
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

        {/* Desktop Auth Buttons */}
       {isLoggedIn === false && (
        <>
         <div className="hidden md:flex gap-4">
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
        </>
       )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3 border-t border-zinc-700 pt-3">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition duration-300"
            >
              {item.title}
            </Link>
          ))}

           {isLoggedIn === false && (
        <>
         <div className="hidden md:flex gap-4">
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
        </>
       )}
        </div>
      </div>
    </nav>
  );
};
