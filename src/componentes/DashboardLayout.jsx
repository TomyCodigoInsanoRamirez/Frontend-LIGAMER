import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";

export default function DashboardLayout({ title, children }) {
  const menuItems = [
    { id: 1, ruta: 'perfil', label: 'Perfil' },
    { id: 2, ruta: 'asignar', label: 'Asignar Organizador' },
  ];
  const encabezados = ["Imagen", "Nombre", "Correo", "Rol", "Estado", "Fecha", "Acciones"];
  const datos = [
    { id: 1, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 2, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 3, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 4, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 5, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 6, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 7, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 8, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 9, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Tomas", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 10, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    { id: 11, imagen: "https://i.pravatar.cc/80?img=1", nombre: "Juan", correo: "juan@x.com", rol: "Admin", estado: "Activo", fecha: "2025-10-26" },
    

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
