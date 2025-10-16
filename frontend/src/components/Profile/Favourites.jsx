import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };

    fetchFavourites();
  }, []); // ✅ Run only once on mount

  // ✅ Remove book instantly from UI when deleted
  const handleRemove = (id) => {
    setFavouriteBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {favouriteBooks.length > 0 ? (
        favouriteBooks.map((item, i) => (
          <div key={i}>
            <BookCard
              data={item}
              Favourite={true}
              onRemove={handleRemove}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-lg">No favourite books found.</p>
      )}
    </div>
  );
};

export default Favourites;
