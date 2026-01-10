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

/**
 * Query params supported by admin order search & filters
 */
export type OrderQueryParams = {
  page?: number;
  limit?: number;
  orderId?: string;
  email?: string;
  status?: string;
  startDate?: string; // ISO string
  endDate?: string;   // ISO string
};

//fetch all orders
export const fetchOrders = async (
  params: OrderQueryParams = {}
): Promise<PaginatedResponse<Order>> => {
  // Build query string safely
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [key, String(value)])
  ).toString();

  const res = await fetch(
    `${BASE_URL}/api/admin/orders?${query}`
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
