import axios from "axios";
import { useAuthStore } from "../store";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

// TODO: interceptors
// Leer el store de Zustand

tesloApi.interceptors.request.use((config) => {
  // const token=localStorage.getItem("")
  const token = useAuthStore.getState().token;
  console.log({token});

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
