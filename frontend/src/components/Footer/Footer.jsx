import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-emerald-200 pt-10 pb-6 px-6 mt-12 shadow-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* ----- 1. Brand Section ----- */}
        <div>
          <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            Boighor BD
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Empowering students through sustainable education. Buy, sell, or donate used textbooks and reduce educational costs while promoting community support.
          </p>
        </div>

        {/* ----- 2. Quick Links ----- */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>
              <a href="/" className="hover:text-emerald-600 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/all-books" className="hover:text-emerald-600 transition-colors duration-200">
                Browse Books
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-emerald-600 transition-colors duration-200">
                Cart
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-emerald-600 transition-colors duration-200">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* ----- 3. Contact & Social ----- */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Connect With Us
          </h3>
          <p className="text-slate-600 mb-4 text-sm">
            Join our community and stay updated on new listings, donations, and sustainability initiatives.
          </p>
          <div className="flex gap-4 text-xl text-slate-700">
            <a href="#" className="hover:text-blue-500 transition-colors duration-200">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-500 transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-slate-500 transition-colors duration-200">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      {/* ----- Bottom Copyright Bar ----- */}
      <div className="border-t border-emerald-200 mt-8 pt-4 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} Boighor BD. Building a sustainable educational community. Our goal is impact, not profit.
      </div>
    </footer>
  )
}
