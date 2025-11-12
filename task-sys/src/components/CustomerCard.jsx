import React from "react";
export default function CustomerCard({ customer, onDelete }) {
  return (
    <div className="bg-white shadow p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{customer.name}</h3>
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
      </div>
      <button
        onClick={() => onDelete(customer._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
