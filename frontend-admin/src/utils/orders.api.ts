import axios from "axios";
import type { Order } from "../types/OrderTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchOrderById = async (id: string): Promise<Order> => {
  const res = await axios.get(`${BASE_URL}/api/admin/orders/${id}`);
  return res.data;
};





/**
 * Fetch all admin orders
 */
export const fetchOrders = async (page = 1, limit = 10): Promise<Order[]> => {
  const res = await axios.get(`${BASE_URL}/api/admin/orders?page=${page}&limit=${limit}`);

  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.orders)) {
    return res.data.orders;
  }

  console.error("Unexpected orders response:", res.data);
  return [];
};

// export const fetchOrders = async (page = 1, limit = 10) => {
//   const res = await fetch(
//     `/api/admin/orders?page=${page}&limit=${limit}`
//   );

//   if (!res.ok) throw new Error("Failed to fetch orders");

//   return res.json();
// };
