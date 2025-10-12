import React from "react";

export const Hero = () => {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80"
        alt="Books background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay (dark gradient for readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full px-6 lg:px-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-yellow-100 leading-tight tracking-wide">
            Discover Your Next <br className="hidden lg:block" /> Great Read
          </h1>

          <p className="text-lg lg:text-xl text-zinc-300 max-w-xl">
            Uncover captivating stories, enrich your knowledge, and spark endless
            inspiration through our handpicked collection of books.
          </p>

          <button className="mt-4 text-yellow-100 text-lg lg:text-xl font-semibold border border-yellow-100 px-8 py-3 rounded-md hover:bg-yellow-100 hover:text-black transition-all duration-300 shadow-md hover:shadow-yellow-200/30">
            Discover Books
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
            alt="Open book"
            className="w-[80%] lg:w-[90%] max-w-[500px] drop-shadow-[0_0_15px_rgba(255,255,0,0.3)] hover:scale-105 transition-transform duration-500 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};
