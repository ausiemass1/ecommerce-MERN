import axios from "axios";
import type { Product } from "../types/Product";
import type { PaginatedResponse } from "../types/api"; // import the PaginatedResponse type

const BASE_URL = import.meta.env.VITE_API_BASE_URL;





export type ProductQueryParams = {
  page?: number;
  limit?: number;
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

//fetch all orders
export const fetchProducts = async (
  params: ProductQueryParams = {}
): Promise<PaginatedResponse<Product>> => {
  const token = localStorage.getItem("token");
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  const res = await axios.get(`${BASE_URL}/api/admin/products`, {
    params: cleanParams,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// fetch single product
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${BASE_URL}/api/admin/product/${id}`);
  return res.data;
};
