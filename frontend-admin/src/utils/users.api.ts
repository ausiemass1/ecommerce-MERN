import axios from "axios";
import type { User } from "../types/UserTypes";
import type { PaginatedResponse } from "../types/api"; 


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type UserQueryParams = {
    page?: number;
    limit?: number;
    orderId?: string;
    email?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export const fetchUserById = async (id: string): Promise<User> => {
    const res = await axios.get(`${BASE_URL}/api/admin/users/${id}`);
    return res.data;
};


// fetch all users
export const fetchAllUsers = async (
    params: UserQueryParams = {}
): Promise<PaginatedResponse<User>> => {
    const token = localStorage.getItem("token");
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) => value !== undefined && value !== ""
        )
    )
    const res = await axios.get(`${BASE_URL}/api/admin/users`, 
        {
            params: cleanParams,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};