import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Customers",
      desc: "View, add, or edit your customers",
      link: "/customers",
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      desc: "Track and manage all orders",
      link: "/orders",
      color: "bg-green-500",
    },
    {
      title: "Add Customer",
      desc: "Add a new customer quickly",
      link: "/customers",
      color: "bg-purple-500",
    },
    {
      title: "Add Order",
      desc: "Create a new order easily",
      link: "/orders",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Welcome to Orders Management
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        Manage all your customers and orders in one place. Add new customers, track
        orders, update statuses, and get a complete overview of your business.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.link)}
            className={`cursor-pointer ${card.color} text-white rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transform transition-all shadow-lg`}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
