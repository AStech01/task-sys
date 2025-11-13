import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-bold text-2xl hover:text-blue-200 transition">
              Customer & Orders
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-medium text-lg">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/customers"
              className="hover:text-blue-200 transition-colors"
            >
              Customers
            </Link>
            <Link
              to="/orders"
              className="hover:text-blue-200 transition-colors"
            >
              Orders
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 px-2 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/customers"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-blue-400 transition-colors"
          >
            Customers
          </Link>
          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-blue-400 transition-colors"
          >
            Orders
          </Link>
        </div>
      )}
    </nav>
  );
}
