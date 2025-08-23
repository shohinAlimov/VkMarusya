import axios from "axios";

let onUnauthorized: (() => void) | null = null;
export const setOnUnauthorized = (cb: () => void) => (onUnauthorized = cb);

export const api = axios.create({
  baseURL: "https://cinemaguide.skillbox.cc/",
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) onUnauthorized?.();
    return Promise.reject(err);
  }
);
