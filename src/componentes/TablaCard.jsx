import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import "./TablaCard.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {requestToJoinTeam} from '../utils/Service/usuario';
import {assignOrganizerRole} from '../utils/Service/administrador';

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
    if (fila.estado === "En curso") {
      navigate(`/TorneoEnCurso/${fila.id}`, { replace: true, state: { from: fila } });
      return;
    } else if (fila.estado === "Guardado") {
      navigate(`/TorneoGuardado/${fila.id}`, { replace: true, state: { from: fila } }); 
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

    let alertConfig = {
      title: `¿${accion} "${fila.nombre || ''}"?`,
      text: `Organizador: ${fila.organizador || '-'}\nEquipos: ${fila.equipos ?? '-'}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4A3287',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    };

    if (accion === "Unirse") {
      alertConfig.title = `¿Deseas unirte al equipo "${fila.name || ''}"?`;
      alertConfig.text = `Al confirmar, se enviará una solicitud para unirte a este equipo. El administrador revisará tu solicitud y te notificará la respuesta.`;
    }

    if (accion === "Asignar") {
      alertConfig.title = `¿Asignar como organizador a "${fila.tournamentName || ''}"?`;
      alertConfig.text = `Al confirmar, se asignará a esta persona como organizador.`;
    }

    MySwal.fire(alertConfig).then((result) => {
      if (!result.isConfirmed) return;

      if (accion === "Asignar") {
        MySwal.fire({
          icon: 'success',
          title: 'Organizador asignado correctamente',
          text: `Se ha asignado a "${fila.nombre || ''}" como organizador.`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A3287'
        }).then(() => {
         // abrirModal(fila);
          try {
            assignOrganizerRole(fila.id)
              .then((data) => { console.log("Respuesta asignar organizador:", data); })
              .catch((err) => { console.error("Error asignar organizador:", err); });
          } catch (error) {
            console.error("Error asignando organizador:", error);
          }
        });
        return;
      }
      if (accion === "Detalles") {
        abrirModal(fila);
        return;
      }
      if (accion === "Retar") {
        MySwal.fire({
          icon: 'success',
          title: 'Reto enviado',
          text: `Has retado a "${fila.nombre || ''}".`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A3287'
        }).then(() => {
          ir(fila);
        });
        return;
      }
      if (accion === "Ver") {
        ir(fila);
        return;
      }
      if (accion === "Unirse") {
        MySwal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: `Ya has solicitado unirte al equipo "${fila.nombre || ''}". Espera respuesta del administrador.`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A3287'
        })
        console.log("Solicitando unirse al equipo:", fila);
        //if (onUnirse) onUnirse(fila);
        try {
          requestToJoinTeam(fila.id)
            .then((data) => { console.log("Respuesta unirse al equipo:", data); })
            .catch((err) => { console.error("Error unirse al equipo:", err); });
        } catch (error) {
          console.error("Error en la solicitud para unirse al equipo:", error);
        }
        return;
      }
      abrirModal(fila);
    });
  }, [MySwal, abrirModal, ir, onUnirse]);

  const renderAcciones = (fila) => {
    return acciones.map((a, index) => {
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

  // Normalizamos encabezados: soportamos string o {key, label}
  const encabezadosNormalizados = useMemo(() => {
    return encabezados.map(col => {
      if (typeof col === "string") {
        return { key: col, label: col };
      }
      return { key: col.key, label: col.label ?? col.key };
    });
  }, [encabezados]);

  // Detectar si hay columna de imagen
  const tieneColumnaImagen = encabezadosNormalizados.some(
    col => col.key.toLowerCase() === "imagen"
  );

  const Row = React.memo(function Row({ fila }) {
    return (
      <div
        className="fila-card"
        onClick={() => acciones.some(a => a.accion === "Ver") && abrirModal(fila)}
      >
        {tieneColumnaImagen && (
          <div className="imagen-col">
            <img
              src={fila.imagen}
              alt={fila.nombre || "Imagen"}
              className="imagen-placeholder"
            />
          </div>
        )}

        {encabezadosNormalizados.map((col, i) => {
          if (col.key.toLowerCase() === "imagen") return null;
          if (col.key === "Acciones") {
            return (
              <div key={i} className="valor-col">
                {renderAcciones(fila)}
              </div>
            );
          }
          return (
            <div key={i} className="valor-col">
              {fila[col.key] ?? "-"}
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
          {tieneColumnaImagen && <div className="encabezado-item"></div>}
          {encabezadosNormalizados.map((col, i) => (
            <div key={i} className="encabezado-item" style={{ color: "white", textWrap: 'wrap' }}>
              {col.label}
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
              {/* AHORA (nunca falla) */}
              {encabezadosNormalizados
                .filter(col => col.key !== "Acciones" && col.key !== "imagen" && col.key !== "Imagen")
                .map((col, index) => {
                  const key = col.key;
                  const value = filaSeleccionada?.[key];

                  // Convertir valor a string seguro
                  const valorMostrable = (() => {
                    if (value === null || value === undefined) return "-";
                    if (typeof value === "object") {
                      // Opcional: mostrar algo más bonito si tiene nombre
                      if (value.nombre) return value.nombre;
                      if (value.name) return value.name;
                      if (value.tournamentName) return value.tournamentName;
                      return JSON.stringify(value);
                    }
                    return String(value);
                  })();

                  return (
                    <p key={key || index}>
                      <strong>{col.label}:</strong> {valorMostrable}
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