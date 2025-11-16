import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function EquiposList() {
  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores', icon: 'bi-person-lines-fill' },
    { id: 2, ruta: 'equipos', label: 'Equipos', icon : 'bi-people-fill' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo', icon: 'bi-person-fill-gear' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo', icon: 'bi-bar-chart-fill' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneos', icon: 'bi-trophy-fill' },
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
    { accion: "Detalles", icon: "bi-eye-fill" },
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
