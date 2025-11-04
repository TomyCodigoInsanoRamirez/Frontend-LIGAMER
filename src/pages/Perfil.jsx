import React, { useState, useEffect } from 'react';
import { Button, Form, Card, ListGroup, Badge, InputGroup, FormControl } from 'react-bootstrap';

// Lista estática de juegos populares (sin llamadas a API → sin CORS)
const STATIC_GAMES = [
  {"id":540,"title":"Overwatch 2","thumbnail":"https://www.freetogame.com/g/540/thumbnail.jpg","short_description":"A hero-focused first-person team shooter from Blizzard Entertainment.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":516,"title":"PUBG: BATTLEGROUNDS","thumbnail":"https://www.freetogame.com/g/516/thumbnail.jpg","short_description":"Get into the action in one of the longest running battle royale games PUBG Battlegrounds.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":508,"title":"Enlisted","thumbnail":"https://www.freetogame.com/g/508/thumbnail.jpg","short_description":"Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":604,"title":"FragPunk","thumbnail":"https://www.freetogame.com/g/604/thumbnail.jpg","short_description":"A free-to-play 5v5 hero shooter that uses cards to modify matches.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":590,"title":"Throne And Liberty","thumbnail":"https://www.freetogame.com/g/590/thumbnail.jpg","short_description":"A free-to-play multi-platform MMORPG from NCSoft and Amazon Games.","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":523,"title":"Fall Guys","thumbnail":"https://www.freetogame.com/g/523/thumbnail.jpg","short_description":"Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms.","genre":"Battle Royale","platform":"PC (Windows)"},
  {"id":11,"title":"Neverwinter","thumbnail":"https://www.freetogame.com/g/11/thumbnail.jpg","short_description":"A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game.","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":517,"title":"Lost Ark","thumbnail":"https://www.freetogame.com/g/517/thumbnail.jpg","short_description":"Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored.","genre":"ARPG","platform":"PC (Windows)"},
  {"id":475,"title":"Genshin Impact","thumbnail":"https://www.freetogame.com/g/475/thumbnail.jpg","short_description":"If you’ve been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair.","genre":"Action RPG","platform":"PC (Windows)"},
  {"id":2,"title":"World of Tanks","thumbnail":"https://www.freetogame.com/g/2/thumbnail2.jpg","short_description":"If you like blowing up tanks, with a quick and intense game style you will love this game!","genre":"Shooter","platform":"PC (Windows)"},
  {"id":521,"title":"Diablo Immortal","thumbnail":"https://www.freetogame.com/g/521/thumbnail.jpg","short_description":"Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.","genre":"MMOARPG","platform":"PC (Windows)"},
  {"id":511,"title":"Phantasy Star Online 2 New Genesis","thumbnail":"https://www.freetogame.com/g/511/thumbnail.jpg","short_description":"The legacy of Phantasy Star Online 2 continues a thousand years later!","genre":"MMORPG","platform":"PC (Windows)"},
  {"id":5,"title":"Crossout","thumbnail":"https://www.freetogame.com/g/5/thumbnail.jpg","short_description":"A post-apocalyptic MMO vehicle combat game!","genre":"Shooter","platform":"PC (Windows)"},
  {"id":9,"title":"World of Warships","thumbnail":"https://www.freetogame.com/g/9/thumbnail.jpg","short_description":"A 3D free to play naval action-themed MMO from the creators of World of Tanks!","genre":"Shooter","platform":"PC (Windows)"},
  {"id":12,"title":"War Thunder","thumbnail":"https://www.freetogame.com/g/12/thumbnail.jpg","short_description":"A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.","genre":"Shooter","platform":"PC (Windows)"},
  {"id":466,"title":"Valorant","thumbnail":"https://www.freetogame.com/g/466/thumbnail.jpg","short_description":"Test your mettle in Riot Games’ character-based FPS shooter Valorant.","genre":"Shooter","platform":"PC (Windows)"},
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
  const [personalData, setPersonalData] = useState({
    nombre: userData.nombre || '',
    email: userData.email || '',
    username: userData.username || '',
  });
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editingInterests, setEditingInterests] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allGames] = useState(STATIC_GAMES); // Sin API
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
    onUpdate({ ...personalData, intereses: interests });
    setEditingPersonal(false);
  };

  const handleSavePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      onUpdate({ password: newPassword });
      setEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Las contraseñas no coinciden o son muy cortas.');
    }
  };

  const handleSaveInterests = () => {
    onUpdate({ intereses: interests });
    setEditingInterests(false);
  };

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* CONTENEDOR CON SCROLL VERTICAL */}
          <div
            style={{
              maxHeight: 'calc(100vh - 100px)', // Ajusta si tienes navbar (80px, 60px, etc.)
              overflowY: 'auto',
              paddingRight: '12px',
              paddingBottom: '20px',
            }}
            className="scroll-container"
          >
            <Card className="mb-4 shadow">
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                <h3 className="mb-0">Perfil de Usuario</h3>
                <Badge bg="light" text="dark">{userData.rol || 'Usuario'}</Badge>
              </Card.Header>
              <Card.Body>

                {/* DATOS PERSONALES */}
                <Card className="mb-3">
                  <Card.Header className="d-flex justify-content-between">
                    <h5>Datos Personales</h5>
                    <Button size="sm" onClick={() => setEditingPersonal(!editingPersonal)}>
                      {editingPersonal ? 'Cancelar' : 'Editar'}
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    {editingPersonal ? (
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            value={personalData.nombre}
                            onChange={(e) => setPersonalData({ ...personalData, nombre: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Correo</Form.Label>
                          <Form.Control
                            type="email"
                            value={personalData.email}
                            onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Usuario</Form.Label>
                          <Form.Control
                            value={personalData.username}
                            onChange={(e) => setPersonalData({ ...personalData, username: e.target.value })}
                          />
                        </Form.Group>
                        <Button onClick={handleSavePersonal}>Guardar</Button>
                      </Form>
                    ) : (
                      <ListGroup variant="flush">
                        <ListGroup.Item><strong>Nombre:</strong> {personalData.nombre}</ListGroup.Item>
                        <ListGroup.Item><strong>Correo:</strong> {personalData.email}</ListGroup.Item>
                        <ListGroup.Item><strong>Usuario:</strong> @{personalData.username}</ListGroup.Item>
                      </ListGroup>
                    )}
                  </Card.Body>
                </Card>

                {/* CONTRASEÑA */}
                <Card className="mb-3">
                  <Card.Header className="d-flex justify-content-between">
                    <h5>Contraseña</h5>
                    <Button size="sm" onClick={() => setEditingPassword(!editingPassword)}>
                      {editingPassword ? 'Cancelar' : 'Cambiar'}
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    {editingPassword ? (
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Nueva contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirmar</Form.Label>
                          <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Button onClick={handleSavePassword}>Guardar</Button>
                      </Form>
                    ) : (
                      <p className="text-muted mb-0">********</p>
                    )}
                  </Card.Body>
                </Card>

                {/* INTERESES */}
                <Card className="mb-3">
                  <Card.Header className="d-flex justify-content-between">
                    <h5>Juegos Favoritos (Free-to-Play)</h5>
                    <Button size="sm" onClick={() => setEditingInterests(!editingInterests)}>
                      {editingInterests ? 'Cancelar' : 'Editar'}
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    {editingInterests ? (
                      <div>
                        <InputGroup className="mb-3">
                          <  FormControl
                            placeholder="Busca: Fortnite, Valorant, Apex..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </InputGroup>

                        {searchQuery.length > 0 && searchQuery.length < 2 && (
                          <p className="text-muted small">Escribe al menos 2 caracteres.</p>
                        )}

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
                          <Button variant="success" size="sm" onClick={handleAddInterest} className="me-2">
                            + Agregar "{selectedGame.title}"
                          </Button>
                        )}
                        <Button size="sm" onClick={handleSaveInterests}>Guardar Intereses</Button>
                      </div>
                    ) : (
                      <ListGroup>
                        {interests.length > 0 ? (
                          interests.map((game) => (
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
                              <Button
                                variant="link"
                                size="sm"
                                className="text-danger"
                                onClick={() => handleRemoveInterest(game.id)}
                              >
                                ×
                              </Button>
                            </ListGroup.Item>
                          ))
                        ) : (
                          <ListGroup.Item className="text-muted">No hay juegos favoritos aún.</ListGroup.Item>
                        )}
                      </ListGroup>
                    )}
                  </Card.Body>
                </Card>

                {/* ESTADÍSTICAS */}
                <Card>
                  <Card.Header><h5>Estadísticas</h5></Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Equipo:</strong> {userData.stats?.equipo || 'Ninguno'}</ListGroup.Item>
                      <ListGroup.Item><strong>Victorias:</strong> {userData.stats?.victorias || 0}</ListGroup.Item>
                      <ListGroup.Item><strong>Torneos:</strong> {userData.stats?.torneosJugados || 0}</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>

              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* ESTILO OPCIONAL DEL SCROLL */}
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          width: 8px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}