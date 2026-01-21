import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8 font-medium">{error}</p>;
  }

  return (
    <section className="mt-12 px-6 lg:px-16 py-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-emerald-100 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-emerald-700 text-3xl lg:text-4xl font-bold border-l-4 border-emerald-500 pl-4">
          Recently Listed Books
        </h2>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300">
          {data.length} books
        </span>
      </div>

      <p className="text-slate-600 mb-6 text-sm lg:text-base">
        Discover recently added textbooks available for purchase or donation. Filter by class, subject, and board to find exactly what you need.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, i) => (
          <div
            key={i}
            className="transform hover:scale-[1.03] transition-transform duration-300"
          >
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
