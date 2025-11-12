// import React from "react";
// import { useEffect, useState } from "react";
// import { getOrders, addOrder, deleteOrder } from "../services/orderService";
// import { getCustomers } from "../services/customerService";
// import OrderForm from "../components/OrderForm";
// import OrderCard from "../components/OrderCard";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [customers, setCustomers] = useState([]);

//   const load = async () => {
//     const [o, c] = await Promise.all([getOrders(), getCustomers()]);
//     setOrders(o);
//     setCustomers(c);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleAdd = async (data) => {
//     await addOrder(data);
//     load();
//   };

//   const handleDelete = async (id) => {
//     await deleteOrder(id);
//     load();
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-6">Orders</h2>
//       <OrderForm onSubmit={handleAdd} customers={customers} />
//       <div className="grid gap-4">
//         {orders.map((o) => (
//           <OrderCard key={o._id} order={o} onDelete={handleDelete} />
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const [ordersRes, customersRes] = await Promise.all([
      axiosClient.get("/orders"),
      axiosClient.get("/customers"),
    ]);
    setOrders(ordersRes.data);
    setCustomers(customersRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (data) => {
    if (editing) {
      await axiosClient.put(`/orders/${editing._id}`, data);
      setEditing(null);
    } else {
      await axiosClient.post("/orders", data);
    }
    load();
  };

  const handleDelete = async (id) => {
    await axiosClient.delete(`/orders/${id}`);
    load();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <OrderForm customers={customers} onSubmit={handleSubmit} editing={editing} />
      <OrderList data={orders} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
