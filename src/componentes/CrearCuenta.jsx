import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CrearCuenta.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CrearCuenta() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    nombres: '',
    apellidoP: '',
    apellidoM: '',
    username: '',
    email: '',
    password: '',
    confirm: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCancel = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await MySwal.fire({
      title: 'Confirmar registro',
      text: '¿Deseas crear la cuenta con los datos ingresados?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4A3287',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    });

    if (!result.isConfirmed) {
      return;
    }

    console.log('Registrando usuario:', form);
    await MySwal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: ' Tu cuenta ha sido creada exitosamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#4A3287'
    });
    navigate('/login');
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6">
          <div className="d-flex flex-column flex-md-row shadow register-card" style={{ minHeight: '60vh', borderRadius: 20, overflow: 'hidden' }}>
            <div className="p-4 register-left" style={{ flex: 1, display: 'grid', alignContent: 'center' }}>
              <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: 8, color: 'white' }}>Crear una cuenta</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-light">Nombres:</label>
                    <input name="nombres" value={form.nombres} onChange={handleChange} className="form-control" placeholder="Ingresa tu(s) nombre(s)" />
                  </div>

                  <div className="mb-3 d-flex gap-2">
                    <div className="flex-fill">
                      <label className="form-label text-light">Apellidos:</label>
                      <input name="apellidoP" value={form.apellidoP} onChange={handleChange} className="form-control" placeholder="Paterno" />
                    </div>
                    <div className="flex-fill">
                      <label className="form-label text-light">&nbsp;</label>
                      <input name="apellidoM" value={form.apellidoM} onChange={handleChange} className="form-control" placeholder="Materno" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">Nombre de usuario:</label>
                    <input name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Placeholder" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">Correo electrónico:</label>
                    <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Placeholder" />
                  </div>

                  <div className="mb-3 position-relative">
                    <label className="form-label text-light">Contraseña:</label>
                    <input name="password" value={form.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} className="form-control" />
                   <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)} aria-label="Mostrar contraseña"><i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i> </button>

                  </div>

                  <div className="mb-3 position-relative">
                    <label className="form-label text-light">Confirmar contraseña:</label>
                    <input name="confirm" value={form.confirm} onChange={handleChange} type={showConfirm ? 'text' : 'password'} className="form-control" />
                   <button type="button" className="eye-btn" style={{color: 'black'}} onClick={() => setShowConfirm(!showConfirm)} aria-label="Mostrar confirmar"><i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i> </button>

                  </div>

                  <div className="d-flex gap-2 mb-3">
                    <button type="button" className="btn btn-danger flex-fill" onClick={handleCancel}>Cancelar</button>
                    <button type="submit" className="btn btn-register flex-fill">Registrarse</button>
                  </div>

                  <div className="text-center text-light">
                    <small>¿Ya tienes cuenta? <Link to="/login" className="text-light">Inicia sesión</Link></small>
                  </div>
                </form>
              </div>
            </div>

            <div className="d-none d-md-flex align-items-center justify-content-center register-right">
              <img src="src/assets/imagenes/Control.png" alt="Decoración" style={{ maxWidth: '60%', height: 'auto' }} />
              <div className="version-text">V1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
