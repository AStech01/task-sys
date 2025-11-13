// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import CustomerForm from "../components/CustomerForm";
// import { Link } from "react-router-dom";

// export default function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [editCustomer, setEditCustomer] = useState(null);

//   const fetchCustomers = async () => {
//     try {
//       const res = await API.get("/customers");
//       // eslint-disable-next-line no-console
//       console.log("Customers API response:", res.data);

//       const data = Array.isArray(res.data)
//         ? res.data
//         : Array.isArray(res.data?.data)
//         ? res.data.data
//         : Array.isArray(res.data?.customers)
//         ? res.data.customers
//         : [];

//       setCustomers(data);
//     } catch (err) {
//       console.error("Error fetching customers:", err);
//       setCustomers([]);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this customer?")) return;
//     await API.delete(`/customers/${id}`);
//     fetchCustomers();
//   };

//   useEffect(() => { fetchCustomers(); }, []);

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <CustomerForm onSuccess={fetchCustomers} existingCustomer={editCustomer} />
//       <h2 className="text-2xl font-semibold mb-4">Customers</h2>
//       <table className="w-full bg-white shadow rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2">Name</th>
//             <th className="p-2">Email</th>
//             <th className="p-2">Phone</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map(c => (
//             <tr key={c._id} className="border-t hover:bg-gray-50">
//               <td className="p-2"><Link to={`/customer/${c._id}`} className="text-blue-600">{c.name}</Link></td>
//               <td className="p-2">{c.email}</td>
//               <td className="p-2">{c.phone}</td>
//               <td className="p-2 space-x-2">
//                 <button className="text-green-600" onClick={() => setEditCustomer(c)}>Edit</button>
//                 <button className="text-red-600" onClick={() => handleDelete(c._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/api";
import CustomerForm from "../components/CustomerForm";
import { Link } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);

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
      console.error("Error fetching customers:", err);
      setCustomers([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Customer Form */}
      <CustomerForm onSuccess={fetchCustomers} existingCustomer={editCustomer} />

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Customer List</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <Link
                      to={`/customer/${c._id}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4 text-center space-x-3">
                    <button
                      onClick={() => setEditCustomer(c)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
