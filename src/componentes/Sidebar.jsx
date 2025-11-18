import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ menuItems = [] }) {
  const { user, logout } = useAuth();

  const iconMap = {
    admin: 'bi-person-fill',
    manager: 'bi-people-fill',
    user: 'bi-trophy-fill',
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#00A6A6' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/src/assets/imagenes/Logo.png" alt="logo" style={{ height: 36, marginRight: 8 }} />
          LIGAMER
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#ligamerNavbar" aria-controls="ligamerNavbar" aria-expanded="false" aria-label="Toggle navigation">
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
            {/* <span className="navbar-text me-3" style={{ color: '#fff' }}>
              {user ? `Usuario: ${user.username || user?.username || ''}` : ''}
            </span> */}
            <Link to="/perfil" className="btn btn-outline-light btn-sm" style={{margin:5}}>
              <span className="navbar-text me-3" style={{ color: '#fff' }}> {user ? `Perfil ${user.username || user?.username || 'Finny_231'}` : 'Perfil Finny_231'} </span>
            </Link>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
