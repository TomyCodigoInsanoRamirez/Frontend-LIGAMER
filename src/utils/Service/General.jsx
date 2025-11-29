// General.jsx
import axios from "axios";
import getBaseUrl from "./BaseUrl";

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------------------
// Interceptor para meter el Bearer Token
// -----------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o sessionStorage, o donde lo guardes

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------------------
// Endpoint: /api/profile
// -----------------------------------------
export async function getProfile() {
  try {
    const response = await api.get("/api/profile");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el perfil:", error);
    throw error;
  }
}
//--------------------------------------------
//Endpoitn: /api/auth/register
//--------------------------------------------
export async function registerUser(userData){
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registrando el usuario:", error);
    throw error;
  }
}