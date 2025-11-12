import axiosClient from "../api/axiosClient";

export const getOrders = async () => {
  const res = await axiosClient.get("/orders");
  return res.data;
};

export const addOrder = async (data) => {
  const res = await axiosClient.post("/orders", data);
  return res.data;
};

export const deleteOrder = async (id) => {
  await axiosClient.delete(`/orders/${id}`);
};
