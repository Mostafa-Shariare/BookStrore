import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

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
  }, [headers]);

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
    <div className="min-h-screen bg-transparent text-slate-900 flex justify-center items-center p-6">
      {ProfileData ? (
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border border-amber-100">
          <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center tracking-tight">
            ⚙️ Settings
          </h1>

          <div className="mb-4">
            <label className="block text-slate-500 text-sm mb-1">Username</label>
            <p className="text-slate-900 bg-amber-50 p-2 rounded-md border border-amber-100">
              {ProfileData.username}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-slate-500 text-sm mb-1">Email</label>
            <p className="text-slate-900 bg-amber-50 p-2 rounded-md border border-amber-100">
              {ProfileData.email}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-slate-500 text-sm mb-1">Address</label>
            <textarea
              name="address"
              rows="5"
              value={Value.address}
              onChange={change}
              className="w-full bg-amber-50 text-slate-900 rounded-md p-3 outline-none border border-amber-200 focus:border-amber-400 resize-none"
            />
          </div>

          <button
            onClick={submitAddress}
            className="w-full py-2.5 bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors rounded-lg font-semibold shadow-sm shadow-amber-400/40"
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
