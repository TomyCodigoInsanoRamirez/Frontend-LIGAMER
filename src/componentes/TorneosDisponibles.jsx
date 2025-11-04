import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function TorneosDisponibles({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'perfil', label: 'Mi perfil' },
    { id: 2, ruta: 'miEquipo', label: 'Mi equipo' },
    { id: 3, ruta: 'torneosDisponibles', label: 'Torneos' },
    { id: 4, ruta: 'elegir-equipo', label: 'Elegir equipo' },
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
    { accion: "Detalles" },
    // Puedes agregar más acciones aquí en el futuro
  ];
  return (
    <div className="dashboard-layout">
      <div className="sideBar" style={{width:'15%', height:'100vh',backgroundColor:'#00A6A6'}}>
        <Sidebar menuItems={menuItems} />
      </div>
      <div className="mainContent" style={{width:'85%', height:'100vh'}}>
        <TablaCard
                  encabezados={encabezados}
                  datos={datos}
                  acciones={acciones}
                />
      </div>
    </div>
  );
}
