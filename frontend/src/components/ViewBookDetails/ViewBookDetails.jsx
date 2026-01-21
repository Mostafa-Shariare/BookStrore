import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookById();
  }, [id]);

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }

  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/add-book-to-favourite",
      {},
      { headers }
    )
    alert(response.data.message)
  }

  const handleCart = async () => {
    // Only add to cart if it's a sell listing (not donate)
    if (Data?.type === "Donate" || Data?.price === 0) {
      alert("This book is available for donation. Please contact the seller directly.");
      return;
    }
    const response = await axios.put("http://localhost:3000/api/v1/add-to-cart",
      {},
      { headers }
    )
    alert(response.data.message)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 to-teal-50 text-slate-700">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 text-red-700">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  const deleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    
    const response = await axios.delete(
      "http://localhost:3000/api/v1/delete-book",
      { headers }
    )
    
    console.log(response.data.message);
    alert(response.data.message);
    navigate("/all-books")
  }

  const isDonate = Data?.type === "Donate" || Data?.price === 0;
  const isOwner = Data?.seller?._id === userId || Data?.seller === userId;
  const canEdit = isOwner || role === "admin";

  return (
    <div className="px-6 md:px-12 py-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col md:flex-row gap-10 min-h-screen text-slate-900">
      {/* Image Section */}
      <div className="bg-white rounded-xl p-8 md:w-3/6 flex flex-col items-center justify-between shadow-lg border-2 border-emerald-100 gap-6">
        <div className="relative w-full">
          <img
            src={Data?.url}
            alt={Data?.title}
            className="max-h-[70vh] object-contain rounded-lg transition-transform duration-300 hover:scale-105 mx-auto"
          />
          {/* Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide border-2 shadow-lg ${
            isDonate 
              ? "bg-teal-100 text-teal-700 border-teal-300" 
              : "bg-emerald-100 text-emerald-700 border-emerald-300"
          }`}>
            {isDonate ? "🎁 Donate" : "💰 Sell"}
          </div>
        </div>

        {/* Action Buttons */}
        {isLoggedIn && (
          <div className="flex gap-4 mt-4">
            {/* Regular user actions */}
            {role === "user" && !isOwner && (
              <>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xl p-3 transition duration-200 shadow-md" 
                  onClick={handleFavourite}
                  title="Add to Favourites"
                >
                  <FaHeart />
                </button>
                {!isDonate && (
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xl p-3 transition duration-200 shadow-md" 
                    onClick={handleCart}
                    title="Add to Cart"
                  >
                    <FaShoppingCart />
                  </button>
                )}
              </>
            )}

            {/* Owner or Admin actions */}
            {canEdit && (
              <>
                <button 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xl p-3 transition duration-200 shadow-md" 
                  onClick={() => navigate(`/profile/add-book?edit=${id}`)}
                  title="Edit Book"
                >
                  <FaEdit />
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xl p-3 transition duration-200 shadow-md" 
                  onClick={deleteBook}
                  title="Delete Book"
                >
                  <MdDeleteOutline />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl p-8 md:w-3/6 flex flex-col gap-6 shadow-lg border-2 border-emerald-100 text-slate-900">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide text-slate-800">
            {Data?.title}
          </h1>
          <h2 className="text-2xl text-slate-600 italic mt-2">by {Data?.author}</h2>
        </div>

        {/* Seller Info */}
        {Data?.seller && (
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <p className="text-sm text-slate-600">
              Listed by: <span className="font-semibold text-emerald-700">{Data.seller.username || "Unknown"}</span>
            </p>
          </div>
        )}

        <div className="border-t border-emerald-200 my-2"></div>

        <p className="text-slate-700 text-lg leading-relaxed">
          {Data?.desc}
        </p>

        {/* Book Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Language</p>
            <p className="text-slate-800 font-medium">{Data?.language || "N/A"}</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Condition</p>
            <p className="text-slate-800 font-medium">{Data?.condition || "N/A"}</p>
          </div>

          {Data?.class && (
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Class</p>
              <p className="text-slate-800 font-medium">{Data.class}</p>
            </div>
          )}

          {Data?.subject && (
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Subject</p>
              <p className="text-slate-800 font-medium">{Data.subject}</p>
            </div>
          )}

          {Data?.board && (
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Board</p>
              <p className="text-slate-800 font-medium">{Data.board}</p>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-6 border-t border-emerald-200">
          {isDonate ? (
            <div className="bg-teal-100 rounded-lg p-6 text-center border-2 border-teal-300">
              <p className="text-4xl font-bold text-teal-700 mb-2">FREE</p>
              <p className="text-teal-600 font-medium">This book is available for donation</p>
            </div>
          ) : (
            <div className="bg-emerald-100 rounded-lg p-6 text-center border-2 border-emerald-300">
              <p className="text-sm text-emerald-600 uppercase font-semibold mb-1">Price</p>
              <p className="text-4xl font-bold text-emerald-700">৳ {Data?.price || "0"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
