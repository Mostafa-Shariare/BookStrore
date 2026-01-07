import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  "Order Placed",
  "Out for delivery",
  "Delivered",
  "Canceled",
];

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  useEffect(() => {
    // Basic guard: if no token, send to login
    if (!headers.id || !localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/get-all-orders",
          { headers }
        );
        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Error fetching all orders:", err);
        setError(
          err.response?.data?.message || "Failed to load orders. Admin only."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [headers, navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await axios.put(
        `http://localhost:3000/api/v1/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert(
        err.response?.data?.message ||
          "Failed to update status. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-lg">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-lg">
        No orders found yet.
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-900 min-h-[60vh] bg-white rounded-2xl border border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">All Orders</h1>
          <p className="text-sm text-slate-600">
            Manage and track all customer orders in real time.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-300">
          {orders.length} orders
        </span>
      </div>

      {/* Header Row */}
      <div className="bg-amber-50 text-slate-700 rounded-md py-3 px-4 flex gap-4 border-b border-amber-200 font-semibold text-sm">
        <div className="w-[5%] text-center">#</div>
        <div className="w-[20%]">User</div>
        <div className="w-[20%]">Book</div>
        <div className="w-[30%]">Description</div>
        <div className="w-[10%]">Price</div>
        <div className="w-[15%]">Status</div>
      </div>

      {/* Orders */}
      <div className="mt-3 flex flex-col gap-3">
        {orders.map((order, i) => (
          <div
            key={order._id}
            className="bg-white w-full rounded-xl py-2 px-4 flex items-center gap-4 hover:bg-amber-50 transition-all border border-amber-100"
          >
            {/* Serial */}
            <div className="w-[5%] text-center text-sm">{i + 1}</div>

            {/* User */}
            <div className="w-[20%] text-sm">
              <p className="font-medium">
                {order.user?.username || "Unknown user"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {order.user?.email}
              </p>
            </div>

            {/* Book */}
            <div className="w-[20%] text-sm">
              <p className="font-medium truncate">
                {order.book?.title || "Untitled"}
              </p>
              <p className="text-xs text-slate-500">
                {order.book?.author || "Unknown author"}
              </p>
            </div>

            {/* Description */}
            <div className="w-[30%] text-sm">
              <p className="truncate text-slate-600">
                {order.book?.desc?.slice(0, 70) || "No description"}...
              </p>
            </div>

            {/* Price */}
            <div className="w-[10%] text-sm">
              <p className="text-slate-700">${order.book?.price || "0"}</p>
            </div>

            {/* Status */}
            <div className="w-[15%]">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                disabled={updatingId === order._id}
                className="w-full bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
