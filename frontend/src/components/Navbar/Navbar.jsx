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
    <nav className="bg-amber-100/90 backdrop-blur border-b border-amber-200/80 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-amber-900"
        >
          BookHeaven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-slate-700 hover:text-amber-700 transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
       {isLoggedIn === false && (
          <>
            <div className="hidden md:flex gap-3">
              <Link
                to="/Login"
                className="px-4 py-1.5 rounded-full border border-amber-300 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/Signup"
                className="px-4 py-1.5 rounded-full bg-amber-500 text-amber-950 text-sm font-semibold hover:bg-amber-400 transition-colors duration-200"
              >
                Signup
              </Link>
            </div>
          </>
       )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none text-amber-900"
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
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-3 border-t border-amber-200 pt-3 pb-4 bg-amber-50/90">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="text-slate-800 hover:text-amber-700 transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}

          {isLoggedIn === false && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/Login"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center px-4 py-2 rounded-full border border-amber-300 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/Signup"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center px-4 py-2 rounded-full bg-amber-500 text-amber-950 text-sm font-semibold hover:bg-amber-400 transition-colors duration-200"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
