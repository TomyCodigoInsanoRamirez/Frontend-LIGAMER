import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function EquiposList() {
  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores' },
    { id: 2, ruta: 'equipos', label: 'Equipos' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneo' },
  ];

  const encabezados = ["Nombre", "Miembros", "Descripción", "Acciones"];
  const datos = [
    { id: 1, nombre: "Los Rayos FC", miembros: 12, descripcion: "Equipo corporativo - turno mañana" },
    { id: 2, nombre: "Tigres del Norte", miembros: 10, descripcion: "Equipo mixto - veteranos" },
    { id: 3, nombre: "Ángeles Azules", miembros: 8, descripcion: "Equipo nuevo, buena coordinación" },
    { id: 4, nombre: "Team Queso", miembros: 11, descripcion: "Equipo informal - ex jugadores" },
    { id: 5, nombre: "Pixar", miembros: 9, descripcion: "Equipo creativo" },
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
