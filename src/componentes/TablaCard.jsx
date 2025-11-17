import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import "./TablaCard.css";
import { Modal, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function TablaCard({ encabezados = [], datos = [], acciones = [], onUnirse }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const navigate = useNavigate();

  // Búsqueda con debounce
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);
  const DEBOUNCE_MS = 250;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setQuery(searchTerm);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  const porPagina = 8;

  const datosFiltrados = useMemo(() => {
    const filtro = (query || "").trim().toLowerCase();
    if (!filtro) return datos;
    return datos.filter((d) =>
      Object.values(d).some((val) =>
        String(val).toLowerCase().includes(filtro)
      )
    );
  }, [query, datos]);

  useEffect(() => {
    setPaginaActual(1);
  }, [query]);

  const totalPaginas = Math.max(1, Math.ceil(datosFiltrados.length / porPagina));

  const datosPaginados = useMemo(() => {
    const start = (paginaActual - 1) * porPagina;
    return datosFiltrados.slice(start, start + porPagina);
  }, [datosFiltrados, paginaActual, porPagina]);

  const abrirModal = useCallback((fila) => {
    setFilaSeleccionada(fila);
    setModalAbierto(true);
  }, []);

  const ir = useCallback((fila) => {
    if(fila.estado === "En curso"){
      navigate("/TorneoEnCurso", { replace: true, state: { from: fila } });
      return;
    }else if(fila.estado === "Guardado"){
      navigate("/TorneoGuardado", { replace: true, state: { from: fila } });
      return;
    }
    
  }, [navigate]);

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setFilaSeleccionada(null);
  }, []);

  // SweetAlert2 wrapper
  const MySwal = withReactContent(Swal);

  // Función genérica que pide confirmación y ejecuta la acción
  const handleAccionClick = useCallback((accionObj, fila, e) => {
    if (e) e.stopPropagation();
    const accion = accionObj?.accion || "Acción";
    MySwal.fire({
      title: `¿${accion} "${fila.nombre || ''}"?`,
      text: `Organizador: ${fila.organizador || '-'}\nEquipos: ${fila.equipos ?? '-'}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (!result.isConfirmed) return;
      // Ejecutar acción real según tipo
      if (accion === "Asignar" || accion === "Detalles") {
        abrirModal(fila);
        return;
      }
      if (accion === "Ver" || accion === "Retar") {
        ir(fila);
        return;
      }
      if (accion === "Unirse") {
        if (typeof onUnirse === "function") {
          onUnirse(fila);
        } else {
          // fallback a navegación si no hay callback
          ir(fila);
        }
        return;
      }
      // Otros casos: fallback a abrir modal
      abrirModal(fila);
    });
  }, [MySwal, abrirModal, ir, onUnirse]);

  const renderAcciones = (fila) => {

  return acciones.map((a, index) => {
    console.log("Si deberia de tener acciones")
    //Funcionalidad de ASIGNAR PENDIENTE
    if (a.accion === "Asignar") {
      return (
        <button
          key={index}
          className="btn-accion me-1"
          onClick={(e) => handleAccionClick(a, fila, e)}
        >
          <i className={a.icon}></i>
        </button>
      );
    }
    //PENDIENTEEE

    // Detalles: abrir modal directamente (sin SweetAlert)
    if (a.accion === "Detalles") {
      return (
        <button
          key={index}
          className="btn-accion me-1"
          onClick={(e) => {
            e.stopPropagation();
            abrirModal(fila);
          }}
        >
          <i className={a.icon}></i>
        </button>
      );
    }

    if (a.accion === "Ver") {
      return (
        <button
          key={index}
          className="btn-accion me-1"
          onClick={(e) => handleAccionClick(a, fila, e)}
        >
          <i className={a.icon}></i>
        </button>
      );
    }

    if (a.accion === "Retar") {
      return (
        <button
          key={index}
          className="btn-accion me-1"
          onClick={(e) => handleAccionClick(a, fila, e)}
        >
          <i className={a.icon}></i>
        </button>
      );
    }

    if (a.accion === "Unirse") {
      return (
        <button
          key={index}
          className="btn-accion me-1"
          onClick={(e) => handleAccionClick(a, fila, e)}
        >
          <i className={a.icon}></i>
        </button>
      );
    }

    return null;
  });
};

  const Row = React.memo(function Row({ fila }) {
    return (
      <div className="fila-card" onClick={() => acciones.some(a => a.accion === "Ver") && abrirModal(fila)}>
        {encabezados.includes("Imagen") && (
          <div className="imagen-col">
            <img src={fila.imagen} alt={fila.nombre || "Imagen"} className="imagen-placeholder" />
          </div>
        )}
        {encabezados.map((col, i) => {
          if (col === "Imagen") return null;
          if (col === "Acciones") {
            return (
              <div key={i} className="valor-col">
                {renderAcciones(fila)}
              </div>
            );
          }
          return (
            <div key={i} className="valor-col">
              {fila[col.toLowerCase()] || "-"}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="tabla-card-container">
      {/* Buscador */}
      <div className="tabla-acciones mb-3">
        <input
          type="text"
          placeholder="Buscar en toda la tabla..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="tabla-scroll">
        {/* Encabezados */}
        <div className="encabezados">
          {encabezados.includes("Imagen") }
          {encabezados.map((col, i) => (
            <div key={i} className="encabezado-item" style={{color:"white", textWrap : 'wrap'}}>
              {col} 
            </div>
          ))}
        </div>

        {/* Filas */}
        <div className="filas">
          {datosPaginados.length === 0 ? (
            <div className="fila-vacia">No se encontraron resultados.</div>
          ) : (
            datosPaginados.map((fila) => (
              <Row key={fila.id} fila={fila} />
            ))
          )}
        </div>
      </div>

      {/* Paginación */}
      <div className="paginador mt-3">
        <button
          onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
          disabled={paginaActual === 1}
          className="pagina-nav"
        >
          Previous
        </button>
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={`pagina-btn ${paginaActual === i + 1 ? "activa" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
          disabled={paginaActual === totalPaginas}
          className="pagina-nav"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <Modal show={modalAbierto} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filaSeleccionada && (
            <>
              {filaSeleccionada.imagen && (
                <div className="text-center mb-3">
                  <img
                    src={filaSeleccionada.imagen}
                    alt="Imagen"
                    style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                  />
                </div>
              )}
              {Object.entries(filaSeleccionada).map(([key, value]) => {
                if (key === "id" || key === "imagen") return null;
                return (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </p>
                );
              })}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}