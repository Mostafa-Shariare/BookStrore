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

  const isDonate = data.type === "Donate" || data.price === 0;
  const typeColor = isDonate 
    ? "bg-teal-100 text-teal-700 border-teal-300" 
    : "bg-emerald-100 text-emerald-700 border-emerald-300";

  return (
    <div className="group">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-xl hover:shadow-emerald-200/40 hover:scale-[1.03] transition-all duration-300">
          {/* Image Section */}
          <div className="bg-emerald-50 rounded-xl flex items-center justify-center overflow-hidden h-[30vh] relative">
            <img
              src={data.url}
              alt={data.title}
              className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
            {/* Sell/Donate Badge */}
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${typeColor} shadow-sm`}>
              {isDonate ? "🎁 Donate" : "💰 Sell"}
            </div>
          </div>

          {/* Title */}
          <h2 className="mt-4 text-lg md:text-xl text-slate-900 font-semibold truncate">
            {data.title}
          </h2>

          {/* Author */}
          {data.author && (
            <p className="text-sm text-slate-600 mt-1 truncate">
              by {data.author}
            </p>
          )}

          {/* Class/Subject Info */}
          {(data.class || data.subject) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {data.class && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                  {data.class}
                </span>
              )}
              {data.subject && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                  {data.subject}
                </span>
              )}
            </div>
          )}

          {/* Price & Condition */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              {isDonate ? (
                <p className="text-lg text-teal-600 font-bold">FREE</p>
              ) : (
                <p className="text-lg text-slate-800 font-semibold">
                  <span className="text-emerald-600 font-bold">৳</span> {data.price}
                </p>
              )}
              {data.condition && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {data.condition}
                </p>
              )}
            </div>
            {data.language && (
              <span className="px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                {data.language}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Remove Button */}
      {Favourite && (
        <button
          onClick={handleRemoveBook}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition shadow-sm"
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
