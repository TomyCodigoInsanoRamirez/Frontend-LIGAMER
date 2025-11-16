import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";
import PieChartGamers from "./PieChartGamers";
import RadarChartGamers from "./RadarChartGamers";
import LineChartGamers from "./LineChartGamers";

export default function DashboardLayoutUserGraficas({ title, children }) {
    const menuItems = [
    { id: 1, ruta: 'perfil', label: 'Mi perfil', icon: 'bi-person-fill'},
    { id: 2, ruta: 'miEquipo', label: 'Mi equipo', icon: 'bi-people-fill' },
    { id: 3, ruta: 'torneosDisponibles', label: 'Torneos', icon: 'bi-trophy-fill' },
    { id: 4, ruta: 'elegir-equipo', label: 'Elegir equipo', icon: 'bi-card-checklist' },
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
