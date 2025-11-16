import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function JugadoresList() {
  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores' },
    { id: 2, ruta: 'equipos', label: 'Equipos' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneo' },
  ];

  const encabezados = ["Nombre", "Nombre de usuario", "Victorias", "Derrotas", "Acciones"];
  const datos = [
    { id: 1, nombre: "Juan Pérez", "nombre de usuario": "juanp", victorias: 15, derrotas: 3 },
    { id: 2, nombre: "María Gómez", "nombre de usuario": "mariag", victorias: 12, derrotas: 5 },
    { id: 3, nombre: "Carlos Ruiz", "nombre de usuario": "carlr", victorias: 18, derrotas: 2 },
    { id: 4, nombre: "Ana López", "nombre de usuario": "analo", victorias: 10, derrotas: 8 },
    { id: 5, nombre: "Pedro Sánchez", "nombre de usuario": "pedros", victorias: 14, derrotas: 4 },
    { id: 6, nombre: "Sofía García", "nombre de usuario": "sofiag", victorias: 17, derrotas: 1 },
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
