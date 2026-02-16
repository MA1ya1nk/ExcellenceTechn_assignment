import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // vite access env varibles by this but not by proces.env
  withCredentials: true,
});

export default api;