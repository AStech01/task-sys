import React from "react";
export default function OrderCard({ order, onDelete }) {
  return (
    <div className="bg-white shadow p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{order.product}</h3>
        <p>Customer: {order.customerId?.name}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Price: ${order.price}</p>
        <p>Status: {order.status}</p>
      </div>
      <button
        onClick={() => onDelete(order._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
