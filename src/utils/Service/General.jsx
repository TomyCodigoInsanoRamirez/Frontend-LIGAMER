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
//--------------------------------------------
// Endopint: /api/auth/forgot-password
//--------------------------------------------
export async function resetPassword(email){
  try {
    const response = await api.post("/api/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Error reseteando la contraseña:", error);
    throw error;
  }
}
//---------------------------------------------
//Endopint: /api/profile/change-password
//---------------------------------------------
export async function changePassword(data){
  try {
    const response = await api.put("/api/profile/change-password", data);
    return response.data;
  } catch (error) {
    console.error("Error cambiando la contraseña:", error);
    throw error;
  }
}
//--------------------------------------------
//Endopoint: /api/admin/users
//--------------------------------------------
export async function getAllUsers(){
  try {
    const response = await api.get("/api/admin/users");
    console.log("Usuarios obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los usuarios:", error);
    throw error;
  }
}


//--------------------------------------------
// Endopoint: /api/tournaments
//--------------------------------------------
export async function getAllTournaments(){
  try {
    const response = await api.get("/api/tournaments/summary");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los torneos:", error);
    throw error;
  }
}

//--------------------------------------------