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
    authorization: `Bearer+ ${localStorage.getItem("token")}`,
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
    const response = await axios.put("http://localhost:3000/api/v1/add-to-cart",
      {},
      { headers }
    )
    alert(response.data.message)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-50 text-slate-700">
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
    const response = await axios.delete(
      "http://localhost:3000/api/v1/delete-book",
      { headers }
    )

    console.log(response.data.message);
    alert(response.data.message);



    navigate("/all-books")
  }

  return (
    <div className="px-6 md:px-12 py-8 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 flex flex-col md:flex-row gap-10 min-h-screen text-slate-900">
      {/* Image Section */}
      <div className="bg-white rounded-xl p-8 md:w-3/6 flex flex-col items-center justify-between shadow-sm border border-amber-100 gap-6">
        <img
          src={Data?.url}
          alt={Data?.title}
          className="max-h-[70vh] object-contain rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        />

        {/* user */}
        {isLoggedIn === true && role === "user" && (
          <div className="flex md:flex-col gap-4 mt-4">
            <button className="bg-white hover:bg-gray-200 rounded-full text-2xl p-3 transition duration-200 shadow-md" onClick={handleFavourite}>
              <FaHeart className="text-red-500" />
            </button>
            <button className="bg-white hover:bg-gray-200 rounded-full text-2xl p-3 transition duration-200 shadow-md" onClick={handleCart}>
              <FaShoppingCart className="text-blue-500" />
            </button>
          </div>
        )}

        {/* admin */}
        {isLoggedIn === true && role === "admin" && (
          <div className="flex md:flex-col gap-4 mt-4">
            <button className="bg-white hover:bg-gray-200 rounded-full text-2xl p-3 transition duration-200 shadow-md" onClick={() => navigate(`/updateBook/${id}`)}>
              <FaEdit className="text-green-500" />
            </button>
            <button className="bg-white hover:bg-gray-200 rounded-full text-2xl p-3 transition duration-200 shadow-md" onClick={deleteBook}>
              <MdDeleteOutline className="text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl p-8 md:w-3/6 flex flex-col gap-6 shadow-sm border border-amber-100 text-slate-900">
        <h1 className="text-4xl font-extrabold tracking-wide">
          {Data?.title}
        </h1>
        <h2 className="text-2xl text-slate-600 italic">by {Data?.author}</h2>

        <div className="border-t border-amber-100 my-4"></div>

        <p className="text-slate-700 text-lg leading-relaxed tracking-wide">
          {Data?.desc}
        </p>

        <div className="mt-auto flex flex-col gap-3 text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Language:</span>{" "}
            {Data?.language}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Price:</span> ${Data?.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
