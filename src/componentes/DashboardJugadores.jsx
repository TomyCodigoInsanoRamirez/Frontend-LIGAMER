import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function DashboardJugadores() {
  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores', icon: 'bi-person-lines-fill' },
    { id: 2, ruta: 'equipos', label: 'Equipos', icon : 'bi-people-fill' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo', icon: 'bi-person-fill-gear' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo', icon: 'bi-bar-chart-fill' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneos', icon: 'bi-trophy-fill' },
  ];

  const encabezados = ["Nombre","Nombre de usuario", "Ganadas", "Perdidas", "Acciones"];
  const datos = [
    { id: 1, nombre:"Rubén Gómez", "nombre de usuario": "JuanPerez", ganadas: 15, perdidas: 3 },
    { id: 2, nombre:"Rubén Gómez", "nombre de usuario": "MariaGonzalez", ganadas: 12, perdidas: 5 },
    { id: 3, nombre:"Rubén Gómez", "nombre de usuario": "CarlosMartinez", ganadas: 18, perdidas: 2 },
    { id: 4, nombre:"Rubén Gómez", "nombre de usuario": "AnaLopez", ganadas: 10, perdidas: 8 },
    { id: 5, nombre:"Rubén Gómez", "nombre de usuario": "PedroSanchez", ganadas: 14, perdidas: 4 },
    { id: 6, nombre:"Rubén Gómez", "nombre de usuario": "LuisaRodriguez", ganadas: 9, perdidas: 9 },
    { id: 7, nombre:"Rubén Gómez", "nombre de usuario": "FranciscoTorres", ganadas: 16, perdidas: 3 },
    { id: 8, nombre:"Rubén Gómez", "nombre de usuario": "IsabelPerez", ganadas: 11, perdidas: 7 },
    { id: 9, nombre:"Rubén Gómez", "nombre de usuario": "RobertoRamirez", ganadas: 13, perdidas: 5 },
    { id: 10, nombre:"Rubén Gómez", "nombre de usuario": "SofiaGarcia", ganadas: 17, perdidas: 1 },
  ];

  const acciones = [
    { accion: "Detalles",  icon: "bi-eye-fill" },
    { accion: "Retar",  icon: "bi-send-fill" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar menuItems={menuItems} />
      <div className="mainContent container-fluid">
        <div className="row">
          <div className="col-12">
            <TablaCard
              encabezados={encabezados}
              datos={datos}
              acciones={acciones}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
