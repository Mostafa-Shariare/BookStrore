import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-amber-100 text-slate-800 pt-10 pb-6 px-6 mt-12 border-t border-amber-200/80">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* ----- 1. Brand Section ----- */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-amber-900">
            BookHeaven
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Your one-stop destination for discovering, reading, and buying your
            favorite books. Curated collections, seamless experience.
          </p>
        </div>

        {/* ----- 2. Quick Links ----- */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-slate-900">
            Quick Links
          </h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>
              <a href="/" className="hover:text-amber-700 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-amber-700 transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/all-books" className="hover:text-amber-700 transition-colors duration-200">
                All Books
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-amber-700 transition-colors duration-200">
                Cart
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-amber-700 transition-colors duration-200">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* ----- 3. Contact & Social ----- */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-slate-900">
            Connect With Us
          </h3>
          <p className="text-slate-600 mb-4 text-sm">
            Follow us on social media for the latest updates, offers, and book
            recommendations.
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
      <div className="border-t border-amber-200 mt-8 pt-4 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} BookHeaven. All rights reserved.
      </div>
    </footer>
  )
}
