

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
