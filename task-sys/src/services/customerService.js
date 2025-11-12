import axiosClient from "../api/axiosClient";

export const getCustomers = async () => {
  const res = await axiosClient.get("/customers");
  return res.data;
};

export const addCustomer = async (data) => {
  const res = await axiosClient.post("/customers", data);
  return res.data;
};

export const deleteCustomer = async (id) => {
  await axiosClient.delete(`/customers/${id}`);
};
