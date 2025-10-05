import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-10 px-8 my-0.5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ----- 1. Brand Section ----- */}
        <div>
          <h2 className="text-2xl font-bold mb-3">BookHeaven</h2>
          <p className="text-gray-400">
            Your one-stop destination for discovering, reading, and buying your favorite books.
          </p>
        </div>

        {/* ----- 2. Quick Links ----- */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-blue-400 transition duration-300">Home</a></li>
            <li><a href="/about-us" className="hover:text-blue-400 transition duration-300">About Us</a></li>
            <li><a href="/all-books" className="hover:text-blue-400 transition duration-300">All Books</a></li>
            <li><a href="/cart" className="hover:text-blue-400 transition duration-300">Cart</a></li>
            <li><a href="/profile" className="hover:text-blue-400 transition duration-300">Profile</a></li>
          </ul>
        </div>

        {/* ----- 3. Contact & Social ----- */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <p className="text-gray-400 mb-4">Follow us on social media for updates & offers.</p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaGithub /></a>
          </div>
        </div>

      </div>

      {/* ----- Bottom Copyright Bar ----- */}
      <div className="border-t border-zinc-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} BookHeaven. All Rights Reserved.
      </div>
    </footer>
  )
}
