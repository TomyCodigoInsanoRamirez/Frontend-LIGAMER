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
// Endpoint: /api/teams
// -----------------------------------------

export async function getAllTeams() {
    try{
        const response = await api.get("/api/teams");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los torneos:", error);
        throw error;
    }
}

// -----------------------------------------
// Endpoint: /api/teams/:teamId/join-requests
// -----------------------------------------
export async function requestToJoinTeam(teamId) {
    try {
        const response = await api.post(`/api/teams/${teamId}/join-requests`);
        return response.data;
    } catch (error) {
        console.error("Error solicitando unirse al equipo:", error);
        throw error;
    }
}

// -----------------------------------------
// Endpoint: /api/stats/pie
// -----------------------------------------
export async function getPieChartData(teamId) {
    console.log("TeamID en Service: "+teamId);
    try {
        const response = await api.post(`/api/stats/pie`, {
             "teamId": teamId 
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los datos del gráfico circular:", error);
        throw error;
    }   
}

// -----------------------------------------
// Endpoint: /api/stats/radar?teamId=&tournamentId=
// -----------------------------------------
export async function getRadarChartData(teamId) {
    try {
        const response = await api.post(`/api/stats/radar`, {
             "teamId": teamId 
        });
        return response.data;       
    }
    catch (error) {
        console.error("Error obteniendo los datos del gráfico de barras:", error);
        throw error;
    }   
}

//--------------------------------------------
// Endopoint: /api/stats/series
//--------------------------------------------
export async function getLineChartData(teamId){
  try {
    const response = await api.post("/api/stats/series", {
       "teamId": teamId 
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los datos del gráfico de líneas:", error);
    throw error;
  } 
}
