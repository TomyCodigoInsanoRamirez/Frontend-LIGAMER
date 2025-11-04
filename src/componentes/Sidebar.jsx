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

export default function Sidebar({ menuItems }) {
  const { user, logout } = useAuth();

  // Mapa de íconos para asociar con cada ruta (puedes personalizarlo según necesidades)
  const iconMap = {
    admin: 'bxs-user',
    manager: 'bxs-group',
    user: 'bxs-trophy',
  };

  return (
    <div
      className="contenedor"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        className="datosUsuario"
        style={{ display: 'grid', placeContent: 'center', padding: '10px' }}
      >
        <img
          src="https://images.vexels.com/media/users/3/163626/raw/921af6b74a5a31274a5c6877b343bebc-logotipo-del-equipo-de-juegos.jpg"
          alt="User avatar"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px',
          }}
        />
        <p>Usuario: {user?.username}</p>
          <div className="opciones" style={{marginTop:20}}>
          <nav>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/${item.ruta}`}
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.label} <i className={`bx ${iconMap[item.ruta] || 'bxs-circle'}`}></i>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="logOut" style={{ padding: '10px' }}>
        <button
          onClick={logout}
          className="btn btn-danger btn-sm mt-3"
          style={{ width: '70%' }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
