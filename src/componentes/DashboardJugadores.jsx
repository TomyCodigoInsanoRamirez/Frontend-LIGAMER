import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function DashboardJugadores() {
  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores' },
    { id: 2, ruta: 'equipos', label: 'Equipos' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneos' },
  ];

  const encabezados = ["Nombre de usuario", "Ganadas", "Perdidas", "Acciones"];
  const datos = [
    { id: 1, "nombre de usuario": "JuanPerez", ganadas: 15, perdidas: 3 },
    { id: 2, "nombre de usuario": "MariaGonzalez", ganadas: 12, perdidas: 5 },
    { id: 3, "nombre de usuario": "CarlosMartinez", ganadas: 18, perdidas: 2 },
    { id: 4, "nombre de usuario": "AnaLopez", ganadas: 10, perdidas: 8 },
    { id: 5, "nombre de usuario": "PedroSanchez", ganadas: 14, perdidas: 4 },
    { id: 6, "nombre de usuario": "LuisaRodriguez", ganadas: 9, perdidas: 9 },
    { id: 7, "nombre de usuario": "FranciscoTorres", ganadas: 16, perdidas: 3 },
    { id: 8, "nombre de usuario": "IsabelPerez", ganadas: 11, perdidas: 7 },
    { id: 9, "nombre de usuario": "RobertoRamirez", ganadas: 13, perdidas: 5 },
    { id: 10, "nombre de usuario": "SofiaGarcia", ganadas: 17, perdidas: 1 },
  ];

  const acciones = [
    { accion: "Detalles" },
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
