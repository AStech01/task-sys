// import React from "react";
// import { useEffect, useState } from "react";
// import { getCustomers, addCustomer, deleteCustomer } from "../services/customerService";
// import CustomerForm from "../components/CustomerForm";
// import CustomerCard from "../components/CustomerCard";

// export default function Customers() {
//   const [customers, setCustomers] = useState([]);

//   const load = () => getCustomers().then(setCustomers);

//   useEffect(() => {
//     load();
//   }, []);

//   const handleAdd = async (data) => {
//     await addCustomer(data);
//     load();
//   };

//   const handleDelete = async (id) => {
//     await deleteCustomer(id);
//     load();
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-6">Customers</h2>
//       <CustomerForm onSubmit={handleAdd} />
//       <div className="grid gap-4">
//         {customers.map((c) => (
//           <CustomerCard key={c._id} customer={c} onDelete={handleDelete} />
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await axiosClient.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (data) => {
    if (editing) {
      await axiosClient.put(`/customers/${editing._id}`, data);
      setEditing(null);
    } else {
      await axiosClient.post("/customers", data);
    }
    load();
  };

  const handleDelete = async (id) => {
    await axiosClient.delete(`/customers/${id}`);
    load();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <CustomerForm onSubmit={handleSubmit} editing={editing} />
      <CustomerList data={customers} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
