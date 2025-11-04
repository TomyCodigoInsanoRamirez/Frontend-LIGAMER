import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";  
import TablaCard from "./TablaCard";

export default function DashboardManagerL({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'manager', label: 'Mi perfil' },
    { id: 2, ruta: 'torneos', label: 'Torneos' },
    { id: 3, ruta: 'crearTorneo', label: 'Crear Torneo' },
  ];
  const encabezados = [ "Nombre", "Estado", "Descripcion",  "Acciones"];
  const datos = [
    { id: 1, nombre: "Torneo de Verano", descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.',estado: "En curso" },
    { id: 2, nombre: "Torneo de Invierno",descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.', estado: "Guardado" },
    { id: 3, nombre: "Torneo de Primavera",descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.', estado: "Guardado" },
    { id: 4, nombre: "Liga de campeones",descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.', estado: "En curso" }
  ]
  const acciones = [
    { accion: "Detalles" },
    {accion : "Ver"}
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
