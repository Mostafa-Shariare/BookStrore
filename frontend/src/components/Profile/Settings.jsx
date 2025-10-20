import axios from "axios";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/update-address",
        Value,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex justify-center items-center p-6">
      {ProfileData ? (
        <div className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-lg shadow-zinc-800 border border-zinc-800">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-6 text-center">
            ⚙️ Settings
          </h1>

          <div className="mb-4">
            <label className="block text-zinc-400 text-sm mb-1">Username</label>
            <p className="text-zinc-100 bg-zinc-800 p-2 rounded-md">
              {ProfileData.username}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-zinc-400 text-sm mb-1">Email</label>
            <p className="text-zinc-100 bg-zinc-800 p-2 rounded-md">
              {ProfileData.email}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-1">Address</label>
            <textarea
              name="address"
              rows="5"
              value={Value.address}
              onChange={change}
              className="w-full bg-zinc-800 text-zinc-100 rounded-md p-3 outline-none border border-zinc-700 focus:border-zinc-500 resize-none"
            />
          </div>

          <button
            onClick={submitAddress}
            className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 transition-colors text-zinc-100 rounded-lg font-medium"
          >
            Update Address
          </button>
        </div>
      ) : (
        <p className="text-zinc-400">Loading user data...</p>
      )}
    </div>
  );
};

export default Settings;
