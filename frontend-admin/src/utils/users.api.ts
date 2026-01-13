import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllUsers = async () => {
    const res = await axios.get(`${BASE_URL}/api/admin/users`);
    return res.data;
};