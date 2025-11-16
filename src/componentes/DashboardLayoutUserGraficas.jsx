import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";
import PieChartGamers from "./PieChartGamers";
import RadarChartGamers from "./RadarChartGamers";
import LineChartGamers from "./LineChartGamers";

export default function DashboardLayoutUserGraficas({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores' },
    { id: 2, ruta: 'equipos', label: 'Equipos' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneo' },
  ];
  return (
    <div className="dashboard-layout">
      <Sidebar menuItems={menuItems} />

      <div className="mainContent">
        <div className="dashboard-container container-fluid">
          <h1>Información del equipo</h1>
          <div className="charts-row">
            <div className="chart-box col-12 col-md-6">
              <PieChartGamers />
            </div>
            <div className="chart-box col-12 col-md-6">
              <RadarChartGamers />
            </div>
          </div>
          <div className="charts-full">
            <LineChartGamers />
          </div>
        </div>
      </div>
    </div>
  );
}
