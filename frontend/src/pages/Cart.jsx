import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items once
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-user-cart", {
          headers,
        });
        setCart(res.data.data || []);
      } catch (error) {
        console.log("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  // Remove item from cart
  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart((prev) => prev.filter((item) => item._id !== bookid));
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  // Calculate total price
  useEffect(() => {
    if (Cart.length > 0) {
      const total = Cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [Cart]);

  // Place order
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/place-order",
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log("Error placing order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {Cart.length === 0 ? (
        <h1 className="text-center text-2xl font-semibold text-gray-700">
          🛒 Your Cart is Empty
        </h1>
      ) : (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Your Cart
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {Cart.map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={item.url}
                  alt={item.name || "Item image"}
                  className="w-32 h-40 object-cover rounded-xl mr-4"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600 text-sm my-2">
                    {item.desc?.slice(0, 100)}...
                  </p>
                  <h3 className="text-blue-600 font-bold text-xl mb-2">
                    ${item.price}
                  </h3>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white mt-10 p-6 rounded-2xl shadow-md text-center">
            <h1 className="text-2xl font-semibold mb-2">Total Amount</h1>
            <h2 className="text-lg text-gray-600">
              {Cart.length} {Cart.length > 1 ? "books" : "book"} —{" "}
              <span className="text-blue-600 font-bold text-2xl">${Total}</span>
            </h2>
            <button
              onClick={placeOrder}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Place Your Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
