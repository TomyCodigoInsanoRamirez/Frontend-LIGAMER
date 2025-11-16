import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function TorneosDisponibles({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'perfil', label: 'Mi perfil', icon: 'bi-person-fill'},
    { id: 2, ruta: 'miEquipo', label: 'Mi equipo', icon: 'bi-people-fill' },
    { id: 3, ruta: 'torneosDisponibles', label: 'Torneos', icon: 'bi-trophy-fill' },
    { id: 4, ruta: 'elegir-equipo', label: 'Elegir equipo', icon: 'bi-card-checklist' },
  ];

  const encabezados = [ "Nombre", "Organizador", "Equipos", "Acciones"];
  const datos = [
    { id: 1,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 2,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 3,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 4,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 5,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 6,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 7,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 8,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 9,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 10,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 11,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
    { id: 12,  nombre: "Liga de campeones", organizador: "Juan Spre", equipos: 16, cuposTomados: 10 },
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
