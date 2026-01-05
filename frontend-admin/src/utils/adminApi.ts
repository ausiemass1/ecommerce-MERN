// adminApi.ts
import axios from 'axios';

const adminApi = axios.create({
  baseURL: `https://mern.austinmasamhiri.com/api/admin`,
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminApi;