import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 min-h-screen">
      {/* Image Section */}
      <div className="bg-zinc-800 rounded-xl p-6 md:w-3/6 flex items-center justify-center shadow-lg shadow-black/50">
        <img
          src={Data?.url}
          alt={Data?.title}
          className="max-h-[80vh] md:max-h-full object-contain rounded-lg"
        />
      </div>

      {/* Details Section */}
      <div className="bg-zinc-800 rounded-xl p-8 md:w-3/6 flex flex-col gap-6 shadow-lg shadow-black/50">
        <h1 className="text-4xl font-bold text-white">{Data?.title}</h1>
        <h2 className="text-2xl text-gray-300 italic">by {Data?.author}</h2>

        <div className="border-t border-gray-700 my-4"></div>

        <p className="text-gray-200 text-lg leading-relaxed">{Data?.desc}</p>

        <div className="mt-auto flex flex-col gap-2">
          <p className="text-gray-400 text-md">
            <span className="font-semibold">Language:</span> {Data?.language}
          </p>
          <p className="text-gray-400 text-md">
            <span className="font-semibold">Price:</span> ${Data?.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
