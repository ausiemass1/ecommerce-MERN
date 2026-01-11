import axios from "axios";
import type { Order } from "../types/OrderTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// PaginatedResponse type
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

// Query params supported by admin order search & filters

export type OrderQueryParams = {
  page?: number;
  limit?: number;
  orderId?: string;
  email?: string;
  status?: string;
  startDate?: string; // ISO string
  endDate?: string; // ISO string
};

//fetch all orders with query params
export const fetchOrders = async (
  params: OrderQueryParams = {}
): Promise<PaginatedResponse<Order>> => {
  const token = localStorage.getItem("token");
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  const res = await axios.get<PaginatedResponse<Order>>(
    `${BASE_URL}/api/admin/orders`,
    {
      params: cleanParams, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// fetch single order
export const fetchOrderById = async (id: string): Promise<Order> => {
  const res = await axios.get(`${BASE_URL}/api/admin/orders/${id}`);
  return res.data;
};
