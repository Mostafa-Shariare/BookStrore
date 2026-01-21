import React from "react";
import "../../index.css";

export const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full px-6 lg:px-20 max-w-6xl mx-auto">
        
        {/* Left Content */}
        <div className="animate-fadeInUp w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-sm font-semibold mb-2">
            🌱 Sustainable Education
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-800 leading-tight tracking-wide">
            Buy, Sell, or <br className="hidden lg:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              Donate Books
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
            Empowering students in Bangladesh through affordable textbooks. Filter by class, subject, and board. Reduce costs, promote sustainability, and build community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="text-white text-lg font-semibold bg-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-300/50 hover:shadow-xl">
              Browse Books
            </button>
            <button className="text-emerald-700 text-lg font-semibold border-2 border-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 transition-all duration-300">
              List Your Book
            </button>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            💡 <strong>Our Mission:</strong> Impact over profit. Making education accessible for all.
          </p>
        </div>

        {/* Right Image/Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
              alt="Students with books"
              className="w-[90%] max-w-[500px] rounded-2xl shadow-2xl border-4 border-white animate-float-soft"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border-2 border-emerald-200">
              <p className="text-sm font-semibold text-emerald-700">📚 1000+ Books</p>
              <p className="text-xs text-slate-600">Available now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
