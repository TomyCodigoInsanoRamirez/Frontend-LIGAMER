import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "bootstrap-icons/font/bootstrap-icons.css"; 

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const { user } = useAuth();

  useEffect(() => {
    // Si el usuario ya está autenticado y llega a /login (por ejemplo con el botón "atrás"),
    // redirigirlo automáticamente a su inicio según el rol.
    if (!user) return;
    const roleMap = {
      'ROLE_JUGADOR': '/user',
      'ROLE_ORGANIZADOR': '/manager',
      'ROLE_ADMINISTRADOR': '/admin'
    };
    const dest = roleMap[user.role] || '/';
    // Reemplazamos la entrada actual del historial para que "atrás" no vuelva a /login inmediatamente.
    navigate(dest, { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const u = await login(username, password);
      // Si veníamos de una ruta protegida, volver ahí, si no, navegar según rol
      if (from) {
        navigate(from, { replace: true });
        return;
      }
      if (u.role === 'ROLE_ADMINISTRADOR' || u.role === 'admin') navigate('/admin');
      else if (u.role === 'ROLE_ORGANIZADOR' || u.role === 'manager') navigate('/manager');
      else navigate('/user');
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100 justify-content-center">
        {/* Left: formulario (siempre visible) */}
        <div className="col-11 col-sm-10 col-md-8 col-lg-6">
          <div className="d-flex flex-column flex-md-row shadow" style={{ minHeight: '60vh', borderRadius: 20, overflow: 'hidden' }}>
            <div className="p-4" style={{ backgroundColor: '#002733', color: 'white', flex: 1, display: 'grid', alignContent: 'center' }}>
              <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <div className="text-center mb-3">
                  <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Inicio de sesión</h1>
                  <img src="src/assets/imagenes/Logo.png" width={100} height={90} alt="Logo del sistema LIGAMER" />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    <label className="form-label">Nombre de usuario:</label>
                    <input
                      type="text"
                      placeholder="Introduce tu nombre de usuario"
                      className="form-control"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 text-start position-relative">
                    <label className="form-label">Contraseña:</label>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Introduce tu contraseña"
                      className="form-control"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />

                    {/* Botón del ojo */}
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Mostrar contraseña"
                      style={{ right: 10 }}  
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>

                    <div className="mt-2"><a className="text-light" href="#">¿Olvidaste tu contraseña?</a></div>
                  </div>

                  {error && <div className="text-danger mb-2">{error}</div>}

                  <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn" style={{ backgroundColor: '#4A3287', color: 'white' }}>
                      Iniciar sesión
                    </button>
                  </div>

                  <div className="d-flex justify-content-center text-center text-light">
                    <p className="mb-0 me-2">¿Aun no tienes cuenta?</p>
                    <Link className="text-light" to="/register">Crear cuenta</Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: imagen decorativa, oculta en pantallas pequeñas */}
            <div className="d-none d-md-flex align-items-center justify-content-center" style={{ backgroundColor: '#00A6A6', width: 220 }}>
              <img src="src/assets/imagenes/Control.png" alt="Decoración" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
