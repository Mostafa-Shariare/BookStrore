import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, Favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );

      alert(response.data.message);

      // ✅ Instantly update UI
      if (onRemove) onRemove(data._id);
    } catch (error) {
      console.error("Error removing book:", error);
      alert("Failed to remove book. Please try again.");
    }
  };

  return (
    <div className="group">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-white border border-amber-100 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-lg hover:shadow-amber-200/40 hover:scale-[1.03] transition-all duration-300">
          {/* Image Section */}
          <div className="bg-amber-50 rounded-xl flex items-center justify-center overflow-hidden h-[30vh]">
            <img
              src={data.url}
              alt={data.title}
              className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Title */}
          <h2 className="mt-4 text-lg md:text-xl text-slate-900 font-semibold truncate">
            {data.title}
          </h2>

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg text-slate-800 font-semibold">
              <span className="text-amber-600 font-bold">$</span> {data.price}
            </p>
            <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wide bg-amber-100 text-amber-700 border border-amber-300">
              {data.language || "Book"}
            </span>
          </div>
        </div>
      </Link>

      {/* Remove Button */}
      {Favourite && (
        <button
          onClick={handleRemoveBook}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition"
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
