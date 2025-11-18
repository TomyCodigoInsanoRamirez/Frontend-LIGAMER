import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";  
import TablaCard from "./TablaCard";

export default function DashboardManagerL({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'manager', label: 'Mi perfil', icon: 'bi-person-fill' },
    { id: 2, ruta: 'torneos', label: 'Torneos', icon: 'bi-trophy-fill' },
    { id: 3, ruta: 'crearTorneo', label: 'Crear Torneo', icon: 'bi-clipboard-check-fill' }, 
  ];
  const encabezados = [ "Nombre", "Estado", "Descripcion",  "Acciones"];
  const datos = [
    { id: 1, nombre: "Torneo de Verano", descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.',estado: "En curso" },
    { id: 2, nombre: "Torneo de Invierno",descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.', estado: "Guardado" },
    { id: 3, nombre: "Torneo de Primavera",descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.', estado: "Guardado" },
    { id: 4, nombre: "Liga de campeones",descripcion: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.', estado: "En curso" }
  ]
  const acciones = [
    { accion: "Detalles", icon: "bi-eye-fill" },
    { accion: "Ver", icon: "bi-diagram-3" }
    // Puedes agregar más acciones aquí en el futuro
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
