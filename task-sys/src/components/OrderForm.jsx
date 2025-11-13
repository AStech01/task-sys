// import React, { useEffect, useState } from "react";
// import API from "../api/api";

// export default function OrderForm({ onSuccess, customerIdDefault }) {
//   const [customers, setCustomers] = useState([]);
//   const [form, setForm] = useState({ customerId: "", product: "", quantity: "", price: "", status: "pending" });

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await API.get("/customers");
//         // eslint-disable-next-line no-console
//         console.log("OrderForm customers response:", res.data);

//         const data = Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data?.data)
//           ? res.data.data
//           : Array.isArray(res.data?.customers)
//           ? res.data.customers
//           : [];

//         setCustomers(data);
//       } catch (err) {
//         console.error(err);
//         setCustomers([]);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     if (customerIdDefault) setForm((f) => ({ ...f, customerId: customerIdDefault }));
//   }, [customerIdDefault]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!form.customerId || !form.product || !form.quantity || !form.price) return alert("All fields required");
//       await API.post("/orders", form);
//       alert("✅ Order added");
//       setForm({ customerId: customerIdDefault || "", product: "", quantity: "", price: "", status: "pending" });
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error adding order");
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow mb-4">
//       <h3 className="font-semibold mb-2">Add Order</h3>
//       <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
//         <input type="text" name="product" placeholder="Product" value={form.product} onChange={handleChange} className="border p-2 rounded" />
//         <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="border p-2 rounded" />
//         <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded" />
//         <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
//           <option value="pending">Pending</option>
//           <option value="shipped">Shipped</option>
//           <option value="delivered">Delivered</option>
//         </select>
//         <select name="customerId" value={form.customerId} onChange={handleChange} className="border p-2 rounded md:col-span-2">
//           <option value="">Select Customer</option>
//           {customers.map((c) => (
//             <option key={c._id || c.id} value={c._id || c.id}>
//               {c.name || c.fullName || c.email || "Customer"}
//             </option>
//           ))}
//         </select>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-2">Add Order</button>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function OrderForm({ onSuccess, customerIdDefault }) {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    product: "",
    quantity: "",
    price: "",
    status: "pending",
  });

  // Fetch customers for select
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get("/customers");
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.customers)
          ? res.data.customers
          : [];
        setCustomers(data);
      } catch (err) {
        console.error(err);
        setCustomers([]);
      }
    };
    fetchCustomers();
  }, []);

  // Set default customer if provided
  useEffect(() => {
    if (customerIdDefault)
      setForm((f) => ({ ...f, customerId: customerIdDefault }));
  }, [customerIdDefault]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.customerId || !form.product || !form.quantity || !form.price)
        return alert("All fields are required");

      await API.post("/orders", form);
      alert("✅ Order added successfully!");
      setForm({
        customerId: customerIdDefault || "",
        product: "",
        quantity: "",
        price: "",
        status: "pending",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Error adding order");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add New Order</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={form.product}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <select
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition md:col-span-2"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id || c.id} value={c._id || c.id}>
              {c.name || c.fullName || c.email || "Customer"}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Add Order
        </button>
      </form>
    </div>
  );
}
