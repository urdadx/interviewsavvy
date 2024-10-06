import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_DEV_API
    : import.meta.env.VITE_PROD_API,
  withCredentials: true,
});
