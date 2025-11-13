// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import API from "../api/api";

// export default function CustomerDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [orders, setOrders] = useState([]);

//   const fetchCustomer = async () => {
//     try {
//       const res = await API.get(`/customers/${id}`);
//       setCustomer(res.data);
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.error(err);
//       alert("Error loading customer details");
//       navigate("/");
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     if (!confirm("Delete this order?")) return;
//     await API.delete(`/orders/${orderId}`);
//     fetchCustomer();
//   };

//   useEffect(() => {
//     fetchCustomer();
//   }, [id]);

//   if (!customer)
//     return (
//       <div className="flex justify-center items-center h-64 text-gray-500">
//         Loading customer details...
//       </div>
//     );

//   return (
//     <div className="max-w-4xl mx-auto mt-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">{customer.name}</h2>
//         <Link
//           to="/"
//           className="text-blue-600 hover:underline flex items-center"
//         >
//           ← Back to Customers
//         </Link>
//       </div>

//       <div className="bg-white shadow rounded p-4 mb-6">
//         <p><span className="font-medium">Email:</span> {customer.email}</p>
//         <p><span className="font-medium">Phone:</span> {customer.phone}</p>
//         <p><span className="font-medium">Joined:</span> {new Date(customer.createdAt).toLocaleDateString()}</p>
//       </div>

//       <h3 className="text-xl font-semibold mb-2">Orders</h3>

//       {orders.length === 0 ? (
//         <p className="text-gray-500">No orders found for this customer.</p>
//       ) : (
//         <table className="w-full bg-white shadow rounded overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">Product</th>
//               <th className="p-2 text-left">Quantity</th>
//               <th className="p-2 text-left">Price</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((o) => (
//               <tr key={o._id} className="border-t">
//                 <td className="p-2">{o.product}</td>
//                 <td className="p-2">{o.quantity}</td>
//                 <td className="p-2">₹{o.price}</td>
//                 <td className="p-2 capitalize">{o.status}</td>
//                 <td className="p-2 text-center">
//                   <button
//                     onClick={() => deleteOrder(o._id)}
//                     className="text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import OrderForm from "../components/OrderForm";

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchCustomer = async () => {
    const res = await API.get(`/customers/${id}`);
    setCustomer(res.data);
    setOrders(res.data.orders || []);
  };

  useEffect(() => { fetchCustomer(); }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {customer && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{customer.name} ({customer.email})</h2>
          <OrderForm onSuccess={fetchCustomer} customerIdDefault={customer._id} />
          <h3 className="text-xl font-semibold mt-4 mb-2">Orders</h3>
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{o.product}</td>
                  <td className="p-2">{o.quantity}</td>
                  <td className="p-2">₹{o.price}</td>
                  <td className="p-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
