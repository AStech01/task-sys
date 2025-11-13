import React, { useEffect, useState } from "react";
import API from "../api/api";
import OrderForm from "../components/OrderForm";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.orders)
        ? res.data.orders
        : [];

      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading orders...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      {/* Order Form */}
      <OrderForm onSuccess={fetchOrders} />

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Orders List</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 font-medium text-gray-700">Product</th>
              <th className="text-left p-4 font-medium text-gray-700">Quantity</th>
              <th className="text-left p-4 font-medium text-gray-700">Price</th>
              <th className="text-left p-4 font-medium text-gray-700">Status</th>
              <th className="text-left p-4 font-medium text-gray-700">Customer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-800">{o.product}</td>
                  <td className="p-4">{o.quantity}</td>
                  <td className="p-4">₹{o.price}</td>
                  <td className="p-4">
                    <span
                      className={`capitalize px-3 py-1 rounded-full text-white text-sm ${
                        o.status === "pending"
                          ? "bg-yellow-500"
                          : o.status === "shipped"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4">{o.customerId?.name || o.customer?.name || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
