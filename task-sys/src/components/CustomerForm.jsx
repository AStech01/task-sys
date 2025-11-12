// import React from "react";
// import { useState } from "react";

// export default function CustomerForm({ onSubmit }) {
//   const [form, setForm] = useState({ name: "", email: "", phone: "" });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//     setForm({ name: "", email: "", phone: "" });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-md rounded p-4 mb-4 flex gap-4 flex-wrap"
//     >
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={form.name}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       />
//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone"
//         value={form.phone}
//         onChange={handleChange}
//         className="border p-2 rounded flex-1"
//         required
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Add Customer
//       </button>
//     </form>
//   );
// }


import { useState, useEffect } from "react";

export default function CustomerForm({ onSubmit, editing }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow flex flex-wrap gap-3 mb-6"
    >
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
}
