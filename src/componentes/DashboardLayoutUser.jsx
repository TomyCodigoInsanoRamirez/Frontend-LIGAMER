import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function DashboardLayoutUser({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'perfil', label: 'Mi perfil' },
    { id: 2, ruta: 'miEquipo', label: 'Mi equipo' },
    { id: 3, ruta: 'torneosDisponibles', label: 'Torneos' },
    { id: 4, ruta: 'elegir-equipo', label: 'Elegir equipo' },
  ];

  const encabezados = ["Imagen", "Lider", "Estado",  "Acciones"];
  const datos = [
    { id: 1, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", estado: "En torneo" },
    
    

  ];
  const acciones = [
    { accion: "Ver" },
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
