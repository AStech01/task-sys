// import React from "react";
// import { useState } from "react";

// export default function OrderForm({ onSubmit, customers }) {
//   const [form, setForm] = useState({
//     customerId: "",
//     product: "",
//     quantity: "",
//     price: "",
//     status: "Pending",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//     setForm({ customerId: "", product: "", quantity: "", price: "", status: "Pending" });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-md rounded p-4 mb-4 flex flex-wrap gap-4"
//     >
//       <select
//         name="customerId"
//         value={form.customerId}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       >
//         <option value="">Select Customer</option>
//         {customers.map((c) => (
//           <option key={c._id} value={c._id}>
//             {c.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="text"
//         name="product"
//         placeholder="Product"
//         value={form.product}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       />
//       <input
//         type="number"
//         name="quantity"
//         placeholder="Quantity"
//         value={form.quantity}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={form.price}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       />
//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Add Order
//       </button>
//     </form>
//   );
// }


import { useState, useEffect } from "react";

export default function OrderForm({ customers, onSubmit, editing }) {
  const [form, setForm] = useState({
    customerId: "",
    product: "",
    quantity: "",
    price: "",
    status: "pending",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      customerId: "",
      product: "",
      quantity: "",
      price: "",
      status: "pending",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow flex flex-wrap gap-3 mb-6"
    >
      <select
        name="customerId"
        value={form.customerId}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      >
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        name="product"
        placeholder="Product"
        value={form.product}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      />
      <input
        name="quantity"
        type="number"
        placeholder="Qty"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 rounded w-24"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 rounded w-24"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
}
