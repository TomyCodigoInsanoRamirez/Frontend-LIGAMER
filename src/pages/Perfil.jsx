import React, { useState, useEffect } from 'react';
import { Button, Form, Card, ListGroup, Badge, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Lista estática de juegos populares (sin llamadas a API → sin CORS)
const STATIC_GAMES = [
  {"id":540,"title":"Overwatch 2","thumbnail":"https://www.freetogame.com/g/540/thumbnail.jpg","short_description":"A hero-focused first-person team shooter from Blizzard Entertainment.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":516,"title":"PUBG: BATTLEGROUNDS","thumbnail":"https://www.freetogame.com/g/516/thumbnail.jpg","short_description":"Get into the action in one of the longest running battle royale games PUBG Battlegrounds.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":508,"title":"Enlisted","thumbnail":"https://www.freetogame.com/g/508/thumbnail.jpg","short_description":"Get ready to command your own World War II military squad in Gaijin and Darkflow Software's MMO squad-based shooter Enlisted.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":604,"title":"FragPunk","thumbnail":"https://www.freetogame.com/g/604/thumbnail.jpg","short_description":"A free-to-play 5v5 hero shooter that uses cards to modify matches.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":590,"title":"Throne And Liberty","thumbnail":"https://www.freetogame.com/g/590/thumbnail.jpg","short_description":"A free-to-play multi-platform MMORPG from NCSoft and Amazon Games.","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":523,"title":"Fall Guys","thumbnail":"https://www.freetogame.com/g/523/thumbnail.jpg","short_description":"Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms.","genre":"Battle Royale","platform":"PC (Windows)"},
  {"id":11,"title":"Neverwinter","thumbnail":"https://www.freetogame.com/g/11/thumbnail.jpg","short_description":"A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game.","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":517,"title":"Lost Ark","thumbnail":"https://www.freetogame.com/g/517/thumbnail.jpg","short_description":"Smilegate's free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored.","genre":"ARPG","platform":"PC (Windows)"},
  {"id":475,"title":"Genshin Impact","thumbnail":"https://www.freetogame.com/g/475/thumbnail.jpg","short_description":"If you've been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair.","genre":"Action RPG","platform":"PC (Windows)"},
  {"id":2,"title":"World of Tanks","thumbnail":"https://www.freetogame.com/g/2/thumbnail2.jpg","short_description":"If you like blowing up tanks, with a quick and intense game style you will love this game!","genre":"Shooter","platform":"PC (Windows)"},
  {"id":521,"title":"Diablo Immortal","thumbnail":"https://www.freetogame.com/g/521/thumbnail.jpg","short_description":"Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.","genre":"MMOARPG","platform":"PC (Windows)"},
  {"id":511,"title":"Phantasy Star Online 2 New Genesis","thumbnail":"https://www.freetogame.com/g/511/thumbnail.jpg","short_description":"The legacy of Phantasy Star Online 2 continues a thousand years later!","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":5,"title":"Crossout","thumbnail":"https://www.freetogame.com/g/5/thumbnail.jpg","short_description":"A post-apocalyptic MMO vehicle combat game!","genre":"Shooter","platform":"PC (Windows)"},
  {"id":9,"title":"World of Warships","thumbnail":"https://www.freetogame.com/g/9/thumbnail.jpg","short_description":"A 3D free to play naval action-themed MMO from the creators of World of Tanks!","genre":"Shooter","platform":"PC (Windows)"},
  {"id":12,"title":"War Thunder","thumbnail":"https://www.freetogame.com/g/12/thumbnail.jpg","short_description":"A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":466,"title":"Valorant","thumbnail":"https://www.freetogame.com/g/466/thumbnail.jpg","short_description":"Test your mettle in Riot Games' character-based FPS shooter Valorant.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":452,"title":"Call of Duty: Warzone","thumbnail":"https://www.freetogame.com/g/452/thumbnail.jpg","short_description":"A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":23,"title":"Apex Legends","thumbnail":"https://www.freetogame.com/g/23/thumbnail.jpg","short_description":"A free-to-play strategic battle royale game featuring 60-player matches and team-based play.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":57,"title":"Fortnite","thumbnail":"https://www.freetogame.com/g/57/thumbnail.jpg","short_description":"A free-to-play, standalone mode of Epic Game's Fortnite.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":212,"title":"Brawlhalla","thumbnail":"https://www.freetogame.com/g/212/thumbnail.jpg","short_description":"A free-to-play 2D platform fighter inspired by the Smash Bros.","genre":"Fighting","platform":"PC (Windows)"},
  {"id":433,"title":"RuneScape","thumbnail":"https://www.freetogame.com/g/433/thumbnail.jpg","short_description":"A popular 3D browser MMORPG boasting a huge player base and 15 years of content.","genre":"MMORPG","platform":"PC (Windows), Web Browser"},
  {"id":46,"title":"RAID: Shadow Legends","thumbnail":"https://www.freetogame.com/g/46/thumbnail.jpg","short_description":"RAID: Shadow Legends is a free-to-play turn-based fantasy RPG with hundreds of champions.","genre":"RPG","platform":"PC (Windows)"},
  {"id":16,"title":"Roblox","thumbnail":"https://www.freetogame.com/g/16/thumbnail.jpg","short_description":"A free to play sandbox MMO with lots of creation options.","genre":"MMO","platform":"PC (Windows)"},
  {"id":325,"title":"MapleStory","thumbnail":"https://www.freetogame.com/g/325/thumbnail.jpg","short_description":"A popular free-to-play 2D side-scrolling MMORPG with tons of quests.","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":335,"title":"Ragnarok Online","thumbnail":"https://www.freetogame.com/g/335/thumbnail.jpg","short_description":"A popular fantasy MMORPG, back to the golden age of MMORPGs.","genre":"MMORPG","platform":"PC (Windows)"}
];

export default function PerfilUsuario({ userData, onUpdate }) {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  const [personalData, setPersonalData] = useState({
    nombre: userData.nombre || '',
    email: userData.email || '',
    username: userData.username || '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [allGames] = useState(STATIC_GAMES);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [interests, setInterests] = useState(userData.intereses || []);

  // Inicializar datos del usuario
  useEffect(() => {
    setInterests(userData.intereses || []);
    setPersonalData({
      nombre: userData.nombre || '',
      email: userData.email || '',
      username: userData.username || '',
    });
  }, [userData]);

  // Búsqueda en tiempo real
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const filtered = allGames
      .filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);

    setSearchResults(filtered);
  }, [searchQuery, allGames]);

  const handleAddInterest = () => {
    if (selectedGame && !interests.find(g => g.id === selectedGame.id)) {
      setInterests([...interests, selectedGame]);
      setSearchQuery('');
      setSelectedGame(null);
    }
  };

  const handleRemoveInterest = (id) => {
    setInterests(interests.filter(g => g.id !== id));
  };

  const handleSavePersonal = () => {
    MySwal.fire({
      title: '¿Desea actualizar los datos?',
      text: 'El resto de usuarios verán la información modificada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
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
          title: 'Datos actualizados',
          text: 'Los datos personales han sido actualizados correctamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A3287'
        });
      }
    });
  };

  const handleSaveInterests = () => {
    MySwal.fire({
      title: '¿Desea actualizar la lista de juegos favoritos?',
      text: 'El resto de usuarios verán la lista modificada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4A3287',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate({ intereses: interests });
        setEditingInterests(false);
        setShowAddGameModal(false);
        MySwal.fire({
          icon: 'success',
          title: 'Lista actualizada',
          text: 'La lista de juegos favoritos ha sido actualizada correctamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A3287'
        });
      }
    });
  };


  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #020722 40%, #000000 100%)', padding: '2rem', position: 'relative', zIndex: 1 }}>
      {/* Contenedor de estrellas */}
      <div className="stars-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Caja blanca contenedora */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          {/* Header Teal */}
          <div style={{ backgroundColor: '#00A6A6', padding: '1rem 2rem', color: 'white' }}>
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>Perfil de usuario</h2>
          </div>

          {/* Contenido */}
          <div style={{ padding: '2rem' }}>
            {/* DATOS PERSONALES */}
            <div className="mb-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e9ecef' }}>
              <div style={{ backgroundColor: '#e9ecef', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ margin: 0, fontWeight: 'bold' }}>Datos Personales</h5>
                <Button 
                  size="sm" 
                  onClick={() => setEditingPersonal(!editingPersonal)}
                  style={{ backgroundColor: '#00A6A6', border: 'none' }}
                >
                  Editar
                </Button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Nombre:</strong> {personalData.nombre}</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Correo:</strong> {personalData.email}</p>
                  <p style={{ marginBottom: 0 }}><strong>Usuario:</strong> {personalData.username}</p>
                </div>
              </div>
            </div>

            {/* CONTRASEÑA */}
            <div className="mb-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e9ecef' }}>
              <div style={{ backgroundColor: '#e9ecef', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ margin: 0, fontWeight: 'bold' }}>Contraseña</h5>
                <Button 
                  size="sm"
                  style={{ backgroundColor: '#00A6A6', border: 'none' }}
                >
                  Editar
                </Button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ margin: 0 }}>********</p>
              </div>
            </div>

            {/* JUEGOS FAVORITOS */}
            <div className="mb-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e9ecef' }}>
              <div style={{ backgroundColor: '#e9ecef', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ margin: 0, fontWeight: 'bold' }}>Juegos Favoritos</h5>
                <Button 
                  size="sm" 
                  onClick={() => {
                    setEditingInterests(!editingInterests);
                    if (!editingInterests) {
                      setShowAddGameModal(true);
                    }
                  }}
                  style={{ backgroundColor: '#00A6A6', border: 'none' }}
                >
                  Editar
                </Button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {interests.length > 0 ? (
                  <ListGroup>
                    {interests.map((game) => (
                      <ListGroup.Item key={game.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={game.thumbnail}
                            alt={game.title}
                            style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 10, borderRadius: 4 }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div>
                            <strong>{game.title}</strong>
                            <small className="d-block text-muted">{game.short_description}</small>
                          </div>
                        </div>
                        {editingInterests && (
                          <Button
                            variant="link"
                            size="sm"
                            className="text-danger"
                            onClick={() => handleRemoveInterest(game.id)}
                          >
                            ×
                          </Button>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p style={{ margin: 0, color: '#6c757d' }}>No hay juegos favoritos aún</p>
                )}
              </div>
            </div>

            {/* ESTADÍSTICAS */}
            <div className="mb-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e9ecef' }}>
              <div style={{ backgroundColor: '#e9ecef', padding: '0.75rem 1.5rem' }}>
                <h5 style={{ margin: 0, fontWeight: 'bold' }}>Estadísticas</h5>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>Equipo:</strong> {userData.stats?.equipo || 'Los insanos'}</p>
                <p style={{ marginBottom: 0 }}><strong>Victorias:</strong> {userData.stats?.victorias || 15}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar datos personales */}
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
                placeholder="Placeholder"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                value={personalData.username}
                onChange={(e) => setPersonalData({ ...personalData, username: e.target.value })}
                placeholder="Placeholder"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger" 
            onClick={() => setEditingPersonal(false)}
          >
            Cancelar
          </Button>
          <Button 
            style={{ backgroundColor: '#4A3287', border: 'none' }}
            onClick={handleSavePersonal}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar juegos */}
      <Modal show={showAddGameModal} onHide={() => {
        setShowAddGameModal(false);
        setSearchQuery('');
        setSelectedGame(null);
      }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar juegos favoritos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ingresar nombre de videojuego</Form.Label>
              <Form.Control
                type="text"
                placeholder="Placeholder"
              />
            </Form.Group>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Busca: Fortnite, Valorant, Apex..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            {searchResults.length > 0 && (
              <ListGroup className="mb-3">
                {searchResults.map((game) => (
                  <ListGroup.Item
                    key={game.id}
                    action
                    onClick={() => setSelectedGame(game)}
                    active={selectedGame?.id === game.id}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 10, borderRadius: 4 }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <strong>{game.title}</strong>
                        <small className="d-block text-muted">{game.short_description}</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            {selectedGame && (
              <Button 
                variant="success" 
                size="sm" 
                onClick={handleAddInterest} 
                className="me-2"
              >
                + Agregar "{selectedGame.title}"
              </Button>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger" 
            onClick={() => {
              setShowAddGameModal(false);
              setSearchQuery('');
              setSelectedGame(null);
            }}
          >
            Cancelar
          </Button>
          <Button 
            style={{ backgroundColor: '#4A3287', border: 'none' }}
            onClick={handleSaveInterests}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
