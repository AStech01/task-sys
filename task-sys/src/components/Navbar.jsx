import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task System</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </nav>
  );
}
