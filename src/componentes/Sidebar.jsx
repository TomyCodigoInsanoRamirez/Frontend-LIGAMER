// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import 'boxicons/css/boxicons.min.css';


// export default function Sidebar() {
//   const { user, logout } = useAuth();

//   return (
//     <div className='contenedor' style={{width: '100%', display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
//       <div className="datosUsuario" style={{display:'grid', placeContent:'center', padding:'10px'}}>
//         <img src="https://images.vexels.com/media/users/3/163626/raw/921af6b74a5a31274a5c6877b343bebc-logotipo-del-equipo-de-juegos.jpg" alt="" 
//           style={{width:'100px', height:'100px', borderRadius:'50%', objectFit:'cover', marginBottom:'10px'}}
//         />
//         <p>Usuario: {user?.username}</p>
//       </div>
//       <div className="opciones">
//         <nav>
//           <ul style={{ listStyle: 'none', padding: 0, display:'flex', flexDirection:'column', alignItems:'center', gap:'20px' }}>
//             <li><Link to="/admin" style={{ color: 'black', textDecoration:'none', fontWeight:'bold' }}>Admin <i class='bx bxs-user'></i>  </Link></li>
//             <li><Link to="/manager" style={{ color: 'black', textDecoration:'none', fontWeight:'bold' }}>Manager <i class='bx bxs-group' ></i></Link></li>
//             <li><Link to="/user" style={{ color: 'black', textDecoration:'none', fontWeight:'bold' }}>User <i class='bx bxs-trophy' ></i></Link></li>            
//           </ul>
//         </nav>
//       </div>
//       <div className="logOut" style={{ padding:'10px'}}>
//         <button onClick={logout} className="btn btn-danger btn-sm mt-3" style={{width:'70%'}}>Cerrar sesión</button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'boxicons/css/boxicons.min.css';

export default function Sidebar({ menuItems = [] }) {
  const { user, logout } = useAuth();

  const iconMap = {
    admin: 'bxs-user',
    manager: 'bxs-group',
    user: 'bxs-trophy',
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
                  {item.label} <i className={`bx ${iconMap[item.ruta] || 'bxs-circle'}`} style={{ marginLeft: 6 }}></i>
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            <span className="navbar-text me-3" style={{ color: '#fff' }}>
              {user ? `Usuario: ${user.username || user?.username || ''}` : ''}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
