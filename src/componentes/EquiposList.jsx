import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";
import { getAllTeams } from "../utils/Service/usuario";
import { useState, useEffect } from "react";

export default function EquiposList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => { 
    getAllTeams()
      .then((data) => {
        setTeams(data);
        console.log("Data equipos: " + data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Equipos actualizado:", teams);
  }, [teams]);

  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores', icon: 'bi-person-lines-fill' },
    { id: 2, ruta: 'equipos', label: 'Equipos', icon : 'bi-people-fill' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo', icon: 'bi-person-fill-gear' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo', icon: 'bi-bar-chart-fill' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneos', icon: 'bi-trophy-fill' },
  ];

  const encabezados = [
    {key:"name", label:"Nombre"}, 
    {key:"members",label:"Miembros"}, 
    {key:"description",label:"Descripción"}, 
    {key:"Acciones",label:"Acciones"}
  ];
  const datos = [
    { id: 1, nombre: "Los Rayos FC", miembros: 12, descripcion: "Equipo corporativo - turno mañana" },
    { id: 2, nombre: "Tigres del Norte", miembros: 10, descripcion: "Equipo mixto - veteranos" },
    { id: 3, nombre: "Ángeles Azules", miembros: 8, descripcion: "Equipo nuevo, buena coordinación" },
    { id: 4, nombre: "Team Queso", miembros: 11, descripcion: "Equipo informal - ex jugadores" },
    { id: 5, nombre: "Pixar", miembros: 9, descripcion: "Equipo creativo" },
  ];

  const acciones = [
    { accion: "Detalles", icon: "bi-eye-fill" },
    { accion: "Unirse", icon: "bi-person-fill-add" }, 
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar menuItems={menuItems} />
      <div className="mainContent container-fluid">
        <div className="row">
          <div className="col-12">
            <TablaCard
              encabezados={encabezados}
              datos={teams}
              acciones={acciones}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
