import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";
import PieChartGamers from "./PieChartGamers";
import RadarChartGamers from "./RadarChartGamers";
import LineChartGamers from "./LineChartGamers";

export default function DashboardLayoutUserGraficas({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'perfil', label: 'Mi perfil' },
    { id: 2, ruta: 'miEquipo', label: 'Mi equipo' },
    { id: 3, ruta: 'torneosDisponibles', label: 'Torneos' },
    { id: 4, ruta: 'elegir-equipo', label: 'Elegir equipo' },
  ];
  return (
    <div className="dashboard-layout">
      <div className="sideBar" style={{width:'15%', height:'100vh',backgroundColor:'#00A6A6'}}>
        <Sidebar menuItems={menuItems} />
      </div>

      <div className="dashboard-container">
      <h1>Información del equipo</h1>
      <div className="charts-row">
        <PieChartGamers />
        <RadarChartGamers />
        
      </div>
      <div className="charts-full">
        <LineChartGamers />
      </div>
    </div>  
    </div>
  );
}
