// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Sidebar({ menuItems = [] }) {
//   const { user, logout } = useAuth();
//   console.log('Rendering Sidebar for user:', user);

//   const iconMap = {
//     admin: 'bi-person-fill',
//     manager: 'bi-people-fill',
//     user: 'bi-trophy-fill',
//   };


//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#00A6A6' }}>
//       <div className="container-fluid">
//         <Link className="navbar-brand d-flex align-items-center" to="/">
//           <img src="/src/assets/imagenes/Logo.png" alt="logo" style={{ height: 36, marginRight: 8 }} />
//           LIGAMER
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#ligamerNavbar" aria-controls="ligamerNavbar" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="ligamerNavbar">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {menuItems.map(item => (
//               <li className="nav-item" key={item.id}>
//                 <Link className="nav-link" to={`/${item.ruta}`}>
//                   {item.label} <i className={`${item.icon || 'bi-circle-fill'}`} style={{ marginLeft: 6 }}></i>
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="d-flex align-items-center">
            {/* <span className="navbar-text me-3" style={{ color: '#fff' }}>
              {user ? `Usuario: ${user.username || user?.username || ''}` : ''}
            </span> */}
//             <Link to="/perfil" className="btn btn-outline-light btn-sm" style={{margin:5}}>
//               <span className="navbar-text me-3" style={{ color: '#fff' }}> {user.role ? ` ${user.role || user?.user || 'Finny_231'}` : 'Perfil Finny_231'} </span>
//             </Link>
//             <button className="btn btn-outline-light btn-sm" onClick={logout}>Cerrar sesión</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ menuItems = [] }) {
  const { user, logout } = useAuth();

  // ---------- Simulación de notificaciones (cambiarás esto por tu llamada real) ----------
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, nombre: 'TomasInsano', solicita: 'equipo' },
    { id: 2, nombre: 'RubenInsano', solicita: 'torneo' },
    { id: 3, nombre: 'AnaGamer', solicita: 'equipo' },
  ]);
  // -----------------------------------------------------------------------------------

  const [showModal, setShowModal] = useState(false);

  const handleAceptar = (id) => {
    console.log('Aceptar solicitud', id);
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  const handleRechazar = (id) => {
    console.log('Rechazar solicitud', id);
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notificaciones.length;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#00A6A6' }}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/src/assets/imagenes/Logo.png" alt="logo" style={{ height: 36, marginRight: 8 }} />
            LIGAMER
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#ligamerNavbar"
            aria-controls="ligamerNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="ligamerNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {menuItems.map(item => (
                <li className="nav-item" key={item.id}>
                  <Link className="nav-link" to={`/${item.ruta}`}>
                    {item.label} <i className={`${item.icon || 'bi-circle-fill'}`} style={{ marginLeft: 6 }}></i>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center">
              <Link to="/perfil" className="btn btn-outline-light btn-sm" style={{ margin: 5 }}>
                <span className="navbar-text me-3" style={{ color: '#fff' }}>
                  {user?.role ? ` ${user.role || user?.user || 'Finny_231'}` : 'Perfil Finny_231'}
                </span>
              </Link>

              {/* Ícono de notificaciones */}
              <div className="position-relative me-3">
                <button
                  className="btn btn-outline-light btn-sm position-relative p-2"
                  onClick={() => setShowModal(true)}
                  style={{ lineHeight: 1 }}
                >
                  <i className="bi bi-bell-fill"></i>
                  {unreadCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de notificaciones */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Solicitudes pendientes</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {notificaciones.length === 0 ? (
                  <p className="text-center text-muted">No tienes solicitudes pendientes</p>
                ) : (
                  notificaciones.map(notif => (
                    <div key={notif.id} className="card mb-3">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{notif.nombre}</strong> quiere unirse a tu{' '}
                          <strong>{notif.solicita === 'equipo' ? 'equipo' : 'torneo'}</strong>
                        </div>
                        <div>
                          <button
                            className="btn btn-success btn-sm me-2"
                            title="Aceptar"
                            onClick={() => handleAceptar(notif.id)}
                          >
                            <i className="bi bi-check-lg"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Rechazar"
                            onClick={() => handleRechazar(notif.id)}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}