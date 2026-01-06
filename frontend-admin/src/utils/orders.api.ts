import axios from "axios";

import type { Order } from "../types/OrderTypes";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


// export const fetchOrders = async (): Promise<Order[]> => {
//   const res = await axios.get(`${BASE_URL}/api/admin/orders`);
//   return res.data;
// };




export const fetchOrderById = async (id: string): Promise<Order> => {
  const res = await axios.get(`${BASE_URL}/api/admin/orders/${id}`);
  return res.data;
};
