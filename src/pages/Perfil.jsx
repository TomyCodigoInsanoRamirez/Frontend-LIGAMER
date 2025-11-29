import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './Perfil.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../utils/Service/General';
import { changePassword } from '../utils/Service/General';

const MySwal = withReactContent(Swal);

export default function PerfilUsuario({ userData, onUpdate }) {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editingPassword, setEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [personalData, setPersonalData] = useState({
    nombre: userData.nombre || '',
    email: userData.email || '',
    username: userData.username || '',
  });
  const [interests, setInterests] = useState(userData.intereses || []);
  const [newGameName, setNewGameName] = useState('');
  const [informacionUsuario, setInformacionUsuario] = useState(null);

  // Sincronizar con props
  useEffect(() => {
    setInterests(userData.intereses || []);
    setPersonalData({
      nombre: userData.nombre || '',
      email: userData.email || '',
      username: userData.username || '',
    });
  }, [userData]);

  const handleAddInterest = () => {
    const gameName = newGameName.trim();
    if (!gameName) {
      MySwal.fire({
        icon: 'warning',
        title: 'Nombre vacío',
        text: 'Por favor escribe el nombre del juego',
        confirmButtonColor: '#4A3287'
      });
      return;
    }

    if (interests.some(g => g.title.toLowerCase() === gameName.toLowerCase())) {
      MySwal.fire({
        icon: 'info',
        title: 'Ya agregado',
        text: `"${gameName}" ya está en tu lista`,
        confirmButtonColor: '#4A3287'
      });
      return;
    }

    const newGame = {
      id: Date.now(),
      title: gameName,
      thumbnail: 'https://via.placeholder.com/80x80/2c3e50/ffffff?text=Game',
      short_description: 'Juego favorito agregado manualmente',
    };

    setInterests([...interests, newGame]);
    setNewGameName('');
    MySwal.fire({
      icon: 'success',
      title: '¡Agregado!',
      text: `"${gameName}" se añadió a tus favoritos`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleRemoveInterest = (id) => {
    setInterests(interests.filter(g => g.id !== id));
  };

  const volver = () => {

    switch (user.role) {
      case "ROLE_ADMINISTRADOR":
        navigate('/admin');
        console.log("Yendo a admin/")
        break;
      case "ROLE_ORGANIZADOR":  
        navigate('/manager');
        console.log("Yendo a manager/")
        break;
      case "ROLE_JUGADOR":
        navigate('/user');
        console.log("Yendo a user/")  
        break;
    }
    
  };

  useEffect(() => {
  getProfile()
    .then((data) => {
      setInformacionUsuario(data);
    })
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  console.log("Información del usuario actualizada en Perfil.jsx:", informacionUsuario);
}, [informacionUsuario]);

  const handleSavePersonal = () => {
    MySwal.fire({
      title: '¿Confirmar cambios?',
      text: 'Los datos personales serán actualizados.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4A3287',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate({ ...personalData, intereses: interests });
        setEditingPersonal(false);
        MySwal.fire({
          icon: 'success',
          title: '¡Datos actualizados!',
          confirmButtonColor: '#4A3287'
        });
      }
    });
  };

  const handleSaveInterests = () => {
    MySwal.fire({
      title: '¿Guardar juegos favoritos?',
      text: 'Tu lista será visible para otros usuarios.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4A3287',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate({ ...personalData, intereses: interests });
        setEditingInterests(false);
        setShowAddGameModal(false);
        MySwal.fire({
          icon: 'success',
          title: '¡Lista guardada!',
          text: 'Tus juegos favoritos se actualizaron correctamente',
          confirmButtonColor: '#4A3287'
        });
      }
    });
  };

  const handleSavePassword = async () => {
    if(!oldPassword || !newPassword || !confirmNewPassword){
      MySwal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#4A3287'
      });
      return;
    }

    if(newPassword !== confirmNewPassword){
      MySwal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'La nueva contraseña y su confirmación no son iguales.',
        confirmButtonColor: '#4A3287'
      });
      return;
    }

    const result = await MySwal.fire({
      title: '¿Guardar nueva contraseña?',
      text: 'Tu contraseña será actualizada.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4A3287',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    });

      if (result.isConfirmed) {
        try{
          await changePassword({
          currentPassword: oldPassword,
          newPassword: newPassword
      });

          MySwal.fire({
          icon: 'success',
          title: '¡Contraseña actualizada!',
          confirmButtonColor: '#4A3287'

        });
        // limpiar campos
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setEditingPassword(false);

    } catch (error) {
    MySwal.fire({
      icon: "error",
      title: "Error al actualizar contraseña",
      text: error?.response?.data?.message || "Ocurrió un error",
      confirmButtonColor: "#4A3287",
      });
    }
  }
};

  return (
    <div className="perfil-page-wrapper">
      <div className="stars-wrapper"></div>

      <div className="perfil-container">
        <div className="perfil-content">
          <div className="perfil-card">
            <div className="perfil-header">
              <h2>Perfil de usuario</h2>
              <Button className='btnVolver' onClick={volver}>Volver</Button>
            </div>

            <div className="perfil-body">
              {/* DATOS PERSONALES */}
              <div className="section-card mb-3">
                <div className="section-header">
                  <h5>Datos Personales</h5>
                  <Button size="sm" onClick={() => setEditingPersonal(true)} className="btn-edit">
                    Editar
                  </Button>
                </div>
                <div className="section-body">
                  <p><strong>Nombre:</strong> {personalData.nombre || 'No definido'}</p>
                  <p><strong>Correo:</strong> {informacionUsuario?.email}</p>
                  <p><strong>Usuario:</strong> {personalData.username}</p>
                </div>
              </div>

              {/* CONTRASEÑA */}
              <div className="section-card mb-3">
                <div className="section-header">
                  <h5>Contraseña</h5>
                  <Button size="sm" className="btn-edit" onClick={()=> setEditingPassword(true)}>Editar</Button>
                </div>
                <div className="section-body">
                  <p>********</p>
                </div>
              </div>

              {/* JUEGOS FAVORITOS */}
              <div className="section-card mb-3">
                <div className="section-header">
                  <h5>Juegos Favoritos</h5>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setEditingInterests(true);
                      setShowAddGameModal(true);
                    }}
                    className="btn-edit"
                  >
                    Editar
                  </Button>
                </div>
                <div className="section-body">
                  {interests.length > 0 ? (
                    <ListGroup className="games-list">
                      {interests.map((game) => (
                        <ListGroup.Item key={game.id} className="game-item">
                          <div className="game-info">
                            <img
                              src={game.thumbnail}
                              alt={game.title}
                              className="game-thumb"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80/2c3e50/ffffff?text=Game'; }}
                            />
                            <div>
                              <strong className="game-title">{game.title}</strong>
                              <small className="game-desc">{game.short_description}</small>
                            </div>
                          </div>
                          {editingInterests && (
                            <Button
                              variant="link"
                              size="sm"
                              className="btn-remove"
                              onClick={() => handleRemoveInterest(game.id)}
                            >
                              ×
                            </Button>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted small">No hay juegos favoritos aún</p>
                  )}
                </div>
              </div>

              {/* ESTADÍSTICAS */}
              <div className="section-card mb-5">
                <div className="section-header">
                  <h5>Estadísticas</h5>
                </div>
                <div className="section-body">
                  <p><strong>Equipo:</strong> {userData.stats?.equipo || 'Los insanos'}</p>
                  <p><strong>Victorias:</strong> {userData.stats?.victorias || 15}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-spacer"></div>
      </div>



      {/* Modal: Editar datos personales */}
      <Modal show={editingPersonal} onHide={() => setEditingPersonal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Datos personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo:</Form.Label>
              <Form.Control
                type="email"
                value={personalData.email}
                onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                placeholder="ejemplo@correo.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                value={personalData.username}
                onChange={(e) => setPersonalData({ ...personalData, username: e.target.value })}
                placeholder="Tu nombre de usuario"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setEditingPersonal(false)}>
            Cancelar
          </Button>
          <Button style={{ backgroundColor: '#4A3287', border: 'none' }} onClick={handleSavePersonal}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal: Agregar juego favorito manualmente */}
      <Modal 
        show={showAddGameModal} 
        onHide={() => {
          setShowAddGameModal(false);
          setEditingInterests(false);
          setNewGameName('');
        }} 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar juego favorito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Escribe el nombre del videojuego</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: League of Legends, Minecraft, GTA V..."
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                autoFocus
              />
            </Form.Group>

            <Button 
              variant="success" 
              onClick={handleAddInterest}
              disabled={!newGameName.trim()}
              className="me-2"
            >
              + Agregar "{newGameName || 'juego'}"
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger" 
            onClick={() => {
              setShowAddGameModal(false);
              setEditingInterests(false);
              setNewGameName('');
            }}
          >
            Cancelar
          </Button>
          <Button 
            style={{ backgroundColor: '#4A3287', border: 'none' }}
            onClick={handleSaveInterests}
          >
            Guardar lista
          </Button>
        </Modal.Footer>
      </Modal>

            {/* Modal: Editar contraseña */}
      <Modal show={editingPassword} onHide={() => setEditingPassword(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>

  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Contraseña actual:</Form.Label>
        <Form.Control
          type="password"
          value={oldPassword}
          onChange={(e) =>
            setOldPassword(e.target.value)
          }
          placeholder="Escribe tu contraseña actual"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nueva contraseña:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          placeholder="Escribe la nueva contraseña"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirmar nueva contraseña:</Form.Label>
        <Form.Control
          type="password"
          value={confirmNewPassword}
          onChange={(e) =>
            setConfirmNewPassword(e.target.value)
          }
          placeholder="Confirma la nueva contraseña"
        />
      </Form.Group>
    </Form>
  </Modal.Body>

    <Modal.Footer>
    <Button variant="danger" onClick={() => setEditingPassword(false)}>
      Cancelar
    </Button>
    <Button
      style={{ backgroundColor: "#4A3287", border: "none" }}
      onClick={handleSavePassword}
    >
      Guardar
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
}
