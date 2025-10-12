import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-all-books"
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-zinc-800">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-200"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-400 mt-8 bg-zinc-800 p-4">
        {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-800 px-6 lg:px-16 py-12">
      {/* Section Heading */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-amber-200 text-3xl lg:text-4xl font-extrabold tracking-wide relative after:content-[''] after:block after:w-24 after:h-1 after:bg-amber-200 after:mx-auto after:mt-2 hover:after:w-32 after:transition-all after:duration-300">
          Explore All Books
        </h2>
        <p className="text-zinc-300 mt-2 text-center max-w-xl">
          Browse through our entire collection of stories, knowledge, and imagination.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
        {data.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
