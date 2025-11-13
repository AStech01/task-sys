

import React, { useState, useEffect } from "react";
import API from "../api/api";

export default function CustomerForm({ onSuccess, existingCustomer }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (existingCustomer) setForm(existingCustomer);
  }, [existingCustomer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.phone) return alert("All fields are required");

      if (existingCustomer) {
        await API.put(`/customers/${existingCustomer._id}`, form);
        alert(" Customer updated successfully!");
      } else {
        await API.post("/customers", form);
        alert(" Customer added successfully!");
      }

      setForm({ name: "", email: "", phone: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert(" Error saving customer");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {existingCustomer ? "Edit Customer" : "Add New Customer"}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
        >
          {existingCustomer ? "Update Customer" : "Add Customer"}
        </button>
      </form>
    </div>
  );
}
