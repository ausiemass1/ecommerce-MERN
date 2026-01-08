import axios from "axios";
import type { Order } from "../types/OrderTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

//fetch all orders
export const fetchOrders = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Order>> => {
  const res = await fetch(
    `${BASE_URL}/api/admin/orders?page=${page}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
};

//fetch single order
export const fetchOrderById = async (id: string): Promise<Order> => {
  const res = await axios.get(`${BASE_URL}/api/admin/orders/${id}`);
  return res.data;
};
