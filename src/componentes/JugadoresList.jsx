import React from "react";
import './DashboardLayout.css';
import Sidebar from "./Sidebar";
import TablaCard from "./TablaCard";
import { useState, useEffect } from "react";
import { getTeamMembers } from "../utils/Service/usuario";
import { useAuth } from "../context/AuthContext";

export default function JugadoresList() {
  const [teamMembers, setTeamMembers] = useState([]);
  const { user } = useAuth();
  
  const menuItems = [
    { id: 1, ruta: 'user', label: 'Jugadores', icon: 'bi-person-lines-fill' },
    { id: 2, ruta: 'equipos', label: 'Equipos', icon : 'bi-people-fill' },
    { id: 3, ruta: 'jugadoresUser', label: 'Mi equipo', icon: 'bi-person-fill-gear' },
    { id: 4, ruta: 'miEquipo', label: 'Resultados de mi equipo', icon: 'bi-bar-chart-fill' },
    { id: 5, ruta: 'torneosDisponibles', label: 'Torneos', icon: 'bi-trophy-fill' },
  ];
   const encabezados = [
    { key: "nombre", label: "Nombre" },
    { key: "email",         label: "Nombre de usuario" },
    { key: "description",    label: "Victorias" },
    { key: "description",    label: "Derrotas" },
    { key: "Acciones",       label: "Acciones" }
  ];

  const datos = [
    { id: 1, nombre: "Juan Pérez", "nombre de usuario": "juanp", victorias: 15, derrotas: 3 },
    { id: 2, nombre: "María Gómez", "nombre de usuario": "mariag", victorias: 12, derrotas: 5 },
    { id: 3, nombre: "Carlos Ruiz", "nombre de usuario": "carlr", victorias: 18, derrotas: 2 },
    { id: 4, nombre: "Ana López", "nombre de usuario": "analo", victorias: 10, derrotas: 8 },
    { id: 5, nombre: "Pedro Sánchez", "nombre de usuario": "pedros", victorias: 14, derrotas: 4 },
    { id: 6, nombre: "Sofía García", "nombre de usuario": "sofiag", victorias: 17, derrotas: 1 },
  ];


  const acciones = [
    { accion: "Detalles", icon: "bi-eye-fill" },
    { accion: "Retar", icon: "bi-send-fill" },
  ];
  

  useEffect(() => {
    // Usar el teamId del usuario logueado desde el AuthContext
    if (!user?.teamId) {
      console.log("El usuario no pertenece a ningún equipo");
      return;
    }

    getTeamMembers(user.teamId)
      .then((data) => {
        setTeamMembers(data);
        console.log("Miembros del equipo:", data);
      })
      .catch((err) => console.error("Error obteniendo miembros:", err));
  }, [user]);

  useEffect(() => {
    console.log("Estado teamMembers actualizado:", teamMembers);
  }, [teamMembers]);

  return (
    <div className="dashboard-layout">
      <Sidebar menuItems={menuItems} />
      <div className="mainContent container-fluid">
        <div className="row">
          <div className="col-12">
            <TablaCard
              encabezados={encabezados}
              datos={teamMembers}
              acciones={acciones}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
