import axios from "axios";

export const addData = async (data) => {
  await axios.post("http://localhost:8080/addItem", data);
  console.log(data);
};

export const deleteData = async (id) => {
  console.log(`http://localhost:8080/deleteMapping/${id}`);
  await axios.delete(`http://localhost:8080/deleteMapping/${id}`);
};

export const getData = async () => {
  let x = await axios.get("http://localhost:8080/getItem");
  console.log(x);
  return x.data;
};

export const sendFormData = async (data) => {
  await axios.post("http://localhost:8080/saveContactUs", data);
};

export const getContectUsData = async () => {
  let x = await axios.get("http://localhost:8080/getContactUs");
  return x.data;
};

export const sendReply = async (data) => {
  await axios.put("http://localhost:8080/getReply", data);
};

export const givePayment = async (data) => {
  const x = await axios.post("http://localhost:8080/create_order", {
    amount: data,
    info: "order_request",
  });
  console.log(x.data);
  return x.data;
};

export const saveOrderItems = async (data) => {
  await axios.post("http://localhost:8080/orderSave", data);
};

export const updateOrderItems = async (data) => {
  await axios.put("http://localhost:8080/updateOrderItem", data);
};

export const getAllOrder = async (data) => {
  // let x = await axios.get("http://localhost:8080/getAllOrders", data);
  let x = await axios.get("http://localhost:8080/getAllOrders/" + data);
  console.log(x);
  return x.data;
};

export const getOrders = async () => {
  let x = await axios.get("http://localhost:8080/getOrders");
  console.log(x.data);
  return x.data;
};
