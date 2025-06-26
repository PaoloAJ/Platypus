"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const PASSCODE = "171717";

export default function PrivateDashboard() {
  const [enteredCode, setEnteredCode] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (isAuthed) fetchData();
  }, [isAuthed]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Error fetching data");
    } else {
      setRequests(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredCode === PASSCODE) {
      setIsAuthed(true);
    } else {
      alert("Wrong passcode");
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B3E5FC] to-[#81D4FA] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 w-full max-w-sm border-l-8 border-[#00BCD4]"
        >
          <h2 className="text-2xl font-bold text-[#01579B] text-center">
            Admin Access
          </h2>
          <input
            type="password"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            maxLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00BCD4] text-[#0D3B66]"
            placeholder="Enter 6-digit passcode"
          />
          <button
            type="submit"
            className="w-full bg-[#00BCD4] text-white font-semibold py-2 rounded-md hover:bg-[#008BA3] transition"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1F5FE] to-[#B3E5FC] px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-[#01579B] mb-10 tracking-tight">
        Submitted Requests
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {requests.length === 0 ? (
          <p className="text-center text-[#0D3B66] text-lg font-medium">
            No requests found yet.
          </p>
        ) : (
          requests.map((req, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md border-l-8 border-[#00BCD4] rounded-2xl shadow-xl p-6 space-y-3 hover:shadow-2xl transition"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#0D3B66]">
                <p>
                  <strong>Email:</strong> {req.email}
                </p>
                <p>
                  <strong>Phone:</strong> {req.phone}
                </p>
                <p className="sm:col-span-2">
                  <strong>Description:</strong> {req.description}
                </p>
                <p className="sm:col-span-2">
                  <strong>Address:</strong> {req.address || "N/A"}
                </p>
              </div>
              <p className="text-sm text-gray-500 text-right">
                Submitted: {new Date(req.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
