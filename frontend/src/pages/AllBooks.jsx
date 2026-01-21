import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    class: "",
    subject: "",
    board: "",
    type: "", // Sell or Donate
    search: ""
  });

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        // Build query params from filters (exclude search for backend, handle it client-side for better UX)
        const params = new URLSearchParams();
        if (filters.class) params.append('class', filters.class);
        if (filters.subject) params.append('subject', filters.subject);
        if (filters.board) params.append('board', filters.board);
        if (filters.type) params.append('type', filters.type);

        const queryString = params.toString();
        const url = queryString 
          ? `http://localhost:3000/api/v1/get-all-books?${queryString}`
          : "http://localhost:3000/api/v1/get-all-books";

        const response = await axios.get(url);
        const books = response.data.data || [];

        setData(books);
        // Don't set filteredData here - let the search filter useEffect handle it
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, [filters.class, filters.subject, filters.board, filters.type]); // Re-fetch when dropdown filters change

  // Apply client-side search filter (handled client-side for instant feedback)
  useEffect(() => {
    let filtered = [...data];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title?.toLowerCase().includes(searchLower) ||
          book.author?.toLowerCase().includes(searchLower) ||
          book.subject?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredData(filtered);
  }, [filters.search, data]);

  // Get unique values for filter dropdowns
  const uniqueClasses = [...new Set(data.map(b => b.class).filter(Boolean))].sort();
  const uniqueSubjects = [...new Set(data.map(b => b.subject).filter(Boolean))].sort();
  const uniqueBoards = [...new Set(data.map(b => b.board).filter(Boolean))].sort();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ class: "", subject: "", board: "", type: "", search: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 mt-8 bg-red-50 border-2 border-red-200 rounded-md px-4 py-3 max-w-xl mx-auto font-medium">
        {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-6 lg:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-emerald-700 text-3xl lg:text-4xl font-extrabold tracking-wide relative after:content-[''] after:block after:w-24 after:h-1 after:bg-emerald-500 after:mx-auto after:mt-3">
            Browse All Books
          </h2>
          <p className="text-slate-600 mt-3 text-sm lg:text-base max-w-2xl">
            Find textbooks by class, subject, and board. Filter by selling or donation listings.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                🔍 Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title, author, or subject..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
              />
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Class
              </label>
              <select
                value={filters.class}
                onChange={(e) => handleFilterChange("class", e.target.value)}
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            {/* Board Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Board
              </label>
              <select
                value={filters.board}
                onChange={(e) => handleFilterChange("board", e.target.value)}
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
              >
                <option value="">All Boards</option>
                {uniqueBoards.map((board) => (
                  <option key={board} value={board}>
                    {board}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="lg:col-span-3 flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Listing Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                >
                  <option value="">All Types</option>
                  <option value="Sell">For Sale</option>
                  <option value="Donate">For Donation</option>
                </select>
              </div>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-emerald-100">
            <p className="text-sm text-slate-600">
              Showing <strong className="text-emerald-700">{filteredData.length}</strong> of <strong>{data.length}</strong> books
            </p>
          </div>
        </div>

        {/* Books Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeInUp">
            {filteredData.map((item, i) => (
              <BookCard key={i} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-emerald-100">
            <p className="text-slate-600 text-lg">No books found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
