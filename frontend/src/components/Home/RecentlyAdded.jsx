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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-200"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-400 mt-8">{error}</p>;
  }

  return (
    <section className="mt-12 px-6 lg:px-16">
      <h2 className="text-amber-200 text-3xl lg:text-4xl font-bold mb-6 border-l-4 border-amber-200 pl-3">
        Recently Added Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
