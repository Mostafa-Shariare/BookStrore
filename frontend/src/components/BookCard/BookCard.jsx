import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <div className="group">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded-xl p-4 flex flex-col shadow-md shadow-black/30 hover:shadow-yellow-200/20 hover:scale-[1.03] transition-all duration-300">
          
          {/* Image Section */}
          <div className="bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden h-[30vh]">
            <img
              src={data.url}
              alt={data.title}
              className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          

          {/* Title */}
          <h2 className="mt-4 text-lg md:text-xl text-amber-100 font-semibold truncate">
            {data.title}
          </h2>

          {/* Price */}
          <p className="mt-2 text-lg text-zinc-300 font-medium">
            <span className="text-amber-200 font-bold">$</span> {data.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
