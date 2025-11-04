import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const u = await login(username, password);
      if (from) return navigate(from, { replace: true });
      if (u.role === 'admin') navigate('/admin');
      else if (u.role === 'manager') navigate('/manager');
      else navigate('/user');
    } catch (err) { setError(err.message); }
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <div style={{ width: '30%', height: '80%', backgroundColor: '#002733', borderRadius: '20px 0 0 20px', display: 'grid', placeContent: 'center' }}>
        <div>
          <h1 style={{fontSize:'35px'}}>Inicio de sesión</h1>
          <img src="src/assets/imagenes/Logo.png" width={120} height={110} alt="Logo del sistema LIGAMER" />
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div style={{ color: 'white', marginBottom: '1rem', display: 'grid', placeItems:'start' }}>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              placeholder="Introduce tu nombre de usuario"
              style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '100%', backgroundColor: 'white', color: 'black' }}
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div style={{ color: 'white', marginBottom: '1rem', display: 'grid', placeItems:'start' }}>
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Introduce tu contraseña"
              style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '100%', backgroundColor: 'white', color: 'black' }}
              value={password} onChange={e => setPassword(e.target.value)}
            />
            <a href="">¿Olvidaste tu contraseña?</a>
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div style={{ color: 'white', marginBottom: '1rem', marginTop: '30px' }}>
            <button style={{ padding: '0.5rem', borderRadius: '5px', width: '50%', backgroundColor: '#4A3287' }}>
              Iniciar sesión
            </button>
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <p>¿Aun no tienes cuenta?</p> <a href="">Crear cuenta</a>
            </div>
          </div>
        </form>
      </div>

      <div style={{ width: '15%', height: '80%', backgroundColor: '#00A6A6', borderRadius: '0px 20px 20px 0px', display:'grid', placeContent:'center' }}>
        <img src="src/assets/imagenes/Control.png" width={120} height={80} alt="Logo del sistema LIGAMER" />
      </div>
    </div>
  );
}
