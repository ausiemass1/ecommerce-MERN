import axios from "axios";
import type { Product } from "../types/Product";

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
  params: ProductQueryParams = {},
): Promise<PaginatedResponse<Product>> => {
  const token = localStorage.getItem("token");
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  const res = await axios.get(
    `${BASE_URL}/api/admin/products`,
    {
      params: cleanParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

 

  return res.data;
};

// export const fetchProducts = async (
//   page = 1,
//   limit = 10
// ): Promise<PaginatedResponse<Product>> => {
//   const token = localStorage.getItem("token");

//   const res = await fetch(
//     `${BASE_URL}/api/admin/products?page=${page}&limit=${limit}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch Products");
//   }

//   return res.json();
// };


//fetch single order
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${BASE_URL}/api/admin/product/${id}`);
  return res.data;
};
