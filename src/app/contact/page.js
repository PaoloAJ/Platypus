"use client";

import React, { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    description: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, phone, description, address } = formData;

    console.log("Form data:", { email, phone, description, address });

    // Form submission logic removed - add your own backend integration here
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#E0F7FA] via-[#B3E5FC] to-[#81D4FA] px-4 pt-36 pb-20">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#01579B] text-center">
          Get a Quote
        </h1>

        {submitted ? (
          <p className="text-green-600 text-center font-medium">
            Thank you! We&apos;ll be in touch shortly.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#0D47A1] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-[#0D47A1] w-full px-4 py-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-[#0D47A1] mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-[#0D47A1] w-full px-4 py-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-[#0D47A1] mb-1"
              >
                What do you want done?
              </label>
              <textarea
                id="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="text-[#0D47A1] w-full px-4 py-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
                placeholder="Tell us about the job..."
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-[#0D47A1] mb-1"
              >
                Address{" "}
                <span className="text-xs text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="text-[#0D47A1] w-full px-4 py-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
                placeholder="123 Main St, City, State"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00BCD4] text-white font-semibold py-2 rounded-md hover:bg-[#008BA3] transition"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
