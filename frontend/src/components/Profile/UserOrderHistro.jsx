import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-order-history", {
          headers,
        });
        console.log(res.data.data);
        setOrderHistory(res.data.data);
      } catch (error) {
        console.log("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [headers]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-slate-500 text-2xl">
        Loading...
      </div>
    );
  }

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-slate-400 text-3xl font-semibold">
        No Order History
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-900 min-h-screen bg-white rounded-2xl border border-amber-100">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Your Order History
      </h1>

      {/* Header Row */}
      <div className="bg-amber-50 text-slate-700 rounded-md py-3 px-4 flex gap-4 border-b border-amber-200 font-semibold">
        <div className="w-[3%] text-center">Sr.</div>
        <div className="w-[22%]">Book</div>
        <div className="w-[45%]">Description</div>
        <div className="w-[9%]">Price</div>
        <div className="w-[16%]">Status</div>
      </div>

      {/* Orders */}
      <div className="mt-3 flex flex-col gap-3">
        {orderHistory.map((items, i) => (
          <div
            key={i}
            className="bg-white w-full rounded-xl py-2 px-4 flex items-center gap-4 hover:bg-amber-50 hover:cursor-pointer transition-all border border-amber-100"
          >
            {/* Serial */}
            <div className="w-[3%] text-center">
              <h1>{i + 1}</h1>
            </div>

            {/* Book Title */}
            <div className="w-[22%]">
              <Link
                to={`/view-book-details/${items.book_id}`}
                className="hover:text-blue-300 truncate block"
              >
                {items.book?.title || "Untitled"}
              </Link>
            </div>

            {/* Description */}
            <div className="w-[45%]">
              <h1>{items.book?.desc?.slice(0, 50) || "No description"}...</h1>
            </div>

            {/* Price */}
            <div className="w-[9%]">
              <h1>${items.book?.price || "0"}</h1>
            </div>

            {/* Status */}
            <div className="w-[16%]">
              <h1
                className={`font-semibold ${
                  items.status === "Order placed"
                    ? "text-green-500"
                    : items.status === "Cancelled"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {items.status || "Pending"}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderHistory;
