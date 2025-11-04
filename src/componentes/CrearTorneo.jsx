import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './CrearTorneo.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function CrearTorneo({ estado = "Nuevo", datosGuardados = {}, equipos = [] }) {
  const [tournamentName, setTournamentName] = useState('');
  const [description, setDescription] = useState('');
  const [numTeams, setNumTeams] = useState(8);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [registrationCloseDate, setRegistrationCloseDate] = useState('');
  const [rules, setRules] = useState('');
  const [ruleList, setRuleList] = useState([]);
  const [generateTrigger, setGenerateTrigger] = useState(0);
  const [matches, setMatches] = useState({});
  const [teamData, setTeamData] = useState({});
  const [graph, setGraph] = useState({ childToParent: {}, parentToChildren: {} });
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [team1Input, setTeam1Input] = useState('');
  const [team2Input, setTeam2Input] = useState('');
  const [team1Image, setTeam1Image] = useState('');
  const [team2Image, setTeam2Image] = useState('');
  const [score1Input, setScore1Input] = useState('');
  const [score2Input, setScore2Input] = useState('');
  const [dateInput, setDateInput] = useState('');
  const svgRef = useRef();
  const prevGraphRef = useRef();
  const hasGenerated = useRef(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log('Estado del torneo:', user);

  const volver = (role) => {
    navigate(`/${role}`);
  }

  const addRule = () => {
    if (rules.trim()) {
      setRuleList(prev => [...prev, rules.trim()]);
      setRules('');
    }
  };

  const removeRule = (index) => {
    setRuleList(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (estado === "Guardado" && datosGuardados) {
      setTournamentName(datosGuardados.tournamentName || '');
      setDescription(datosGuardados.description || '');
      setNumTeams(datosGuardados.numTeams || 8);
      setStartDate(datosGuardados.startDate || '');
      setEndDate(datosGuardados.endDate || '');
      setRegistrationCloseDate(datosGuardados.registrationCloseDate || '');
      setRuleList(datosGuardados.ruleList || []);
    }
  }, [estado, datosGuardados]);

  useEffect(() => {
    if ((estado === "Guardado" || estado === "En curso") && !hasGenerated.current) {
      hasGenerated.current = true;
      setGenerateTrigger(prev => prev + 1);
      setTournamentName(datosGuardados.tournamentName || '');
    }
  }, [estado]);

  useEffect(() => {
    if (selectedNode) {
      const parentId = graph.childToParent[selectedNode];
      if (parentId) {
        const siblings = graph.parentToChildren[parentId];
        const rivalId = siblings.find(id => id !== selectedNode);
        const currentTeam1 = teamData[selectedNode]?.name || '';
        const currentTeam2 = teamData[rivalId]?.name || '';
        const currentTeam1Img = teamData[selectedNode]?.image || '';
        const currentTeam2Img = teamData[rivalId]?.image || '';
        const existingMatch = matches[parentId] || { score1: '', score2: '', date: '' };
        setTeam1Input(currentTeam1);
        setTeam2Input(currentTeam2);
        setTeam1Image(currentTeam1Img);
        setTeam2Image(currentTeam2Img);
        setScore1Input(existingMatch.score1 || '');
        setScore2Input(existingMatch.score2 || '');
        setDateInput(existingMatch.date || '');
      } else {
        setSelectedNode(null);
      }
    }
  }, [selectedNode, teamData, matches, graph]);

  useEffect(() => {
    if (generateTrigger === 0) return;

    let nodeId = 0;
    const newNodes = [];
    const newConnections = [];

    let speedFactor = 1;
    if (numTeams > 32) speedFactor = 0.33;
    else if (numTeams > 16) speedFactor = 0.5;

    const baseCount = Math.max(1, numTeams / 2);
    const dynamicWidth = Math.max(1200, baseCount * 120);
    const dynamicHeight = 1200;
    const centerX = dynamicWidth / 2;
    const centerY = dynamicHeight / 2;
    const totalLevels = Math.log2(Math.max(2, numTeams));
    const branchLevels = Math.max(1, Math.floor(totalLevels) - 1);

    let levelSpacing = 200;
    if (numTeams > 32) levelSpacing = 250;
    if (numTeams > 64) levelSpacing = 300;
    if (numTeams > 128) levelSpacing = 350;

    const spreadSpacing = Math.max(80, (dynamicWidth - 400) / (baseCount - 1 || 1));

    const createBranch = (isTop) => {
      const direction = isTop ? -1 : 1;
      const branchHeight = branchLevels;
      const levelsNodes = [];
      const leafCount = baseCount;
      const leafY = centerY + direction * branchHeight * levelSpacing;
      const leafNodes = [];
      for (let i = 0; i < leafCount; i++) {
        const x = centerX + (i - (leafCount - 1) / 2) * spreadSpacing;
        const node = { id: `node${nodeId++}_${isTop ? 'topLeaf' : 'bottomLeaf'}`, x, y: leafY, isTop };
        newNodes.push(node);
        leafNodes.push(node);
      }
      levelsNodes.push(leafNodes);
      for (let level = branchHeight - 1; level >= 0; level--) {
        const children = levelsNodes[0];
        const parents = [];
        for (let i = 0; i < children.length; i += 2) {
          const c1 = children[i];
          const c2 = children[i + 1];
          const parentY = (c1.y + c2.y) / 2 - direction * levelSpacing;
          const parentX = (c1.x + c2.x) / 2;
          const parent = { id: `node${nodeId++}_${isTop ? 'top' : 'bottom'}`, x: parentX, y: parentY, isTop };
          newNodes.push(parent);
          newConnections.push({ from: parent, to: c1 });
          newConnections.push({ from: parent, to: c2 });
          parents.push(parent);
        }
        levelsNodes.unshift(parents);
      }
      const apex = levelsNodes[0][0];
      apex.x = centerX;
      apex.y = centerY + direction * levelSpacing;
      return apex;
    };

    const apexTop = createBranch(true);
    const apexBottom = createBranch(false);

    const centralNode = { id: `node${nodeId++}_central`, x: centerX, y: centerY, isTop: null };
    newNodes.push(centralNode);
    newConnections.push({ from: centralNode, to: apexTop });
    newConnections.push({ from: centralNode, to: apexBottom });

    const childToParent = {};
    const parentToChildren = {};
    newConnections.forEach(c => {
      if (!parentToChildren[c.from.id]) parentToChildren[c.from.id] = [];
      parentToChildren[c.from.id].push(c.to.id);
      childToParent[c.to.id] = c.from.id;
    });

    let minX = Math.min(...newNodes.map(d => d.x));
    let maxX = Math.max(...newNodes.map(d => d.x));
    let minY = Math.min(...newNodes.map(d => d.y));
    let maxY = Math.max(...newNodes.map(d => d.y));
    const padding = 100;
    minX -= padding / 2;
    maxX += padding / 2;
    minY -= padding / 2;
    maxY += padding / 2;

    newNodes.forEach(d => {
      d.x -= minX;
      d.y -= minY;
    });

    setGraph({ childToParent, parentToChildren });
    setNodes(newNodes);
    setConnections(newConnections);
  }, [generateTrigger, numTeams]);

  useEffect(() => {
    if (estado === "En curso" && nodes.length > 0 && equipos.length > 0) {
      const leaves = nodes
        .filter(d => !graph.parentToChildren[d.id])
        .sort((a, b) => a.y - b.y || a.x - b.x); // Top leaves first (smaller y)
      const newTeamData = { ...teamData };
      equipos.forEach((eq, i) => {
        if (i < leaves.length) {
          const leafId = leaves[i].id;
          newTeamData[leafId] = { name: eq.nombre, image: eq.imagen };
        }
      });
      setTeamData(newTeamData);
    }
  }, [nodes, estado, equipos, graph]);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        if (event.key === '+') svg.transition().duration(250).call(zoom.scaleBy, 1.1);
        else if (event.key === '-') svg.transition().duration(250).call(zoom.scaleBy, 0.9);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const requiredWidth = Math.max(...nodes.map(d => d.x)) + 100;
    const requiredHeight = Math.max(...nodes.map(d => d.y)) + 100;
    svg.attr('viewBox', `0 0 ${requiredWidth} ${requiredHeight}`);

    const lineGenerator = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveStep);

    const isFullRedraw = prevGraphRef.current !== graph;
    prevGraphRef.current = graph;

    let speedFactor = isFullRedraw ? (numTeams > 32 ? 0.33 : numTeams > 16 ? 0.5 : 1) : 0;

    connections.forEach((c, i) => {
      const lineData = [
        { x: c.from.x, y: c.from.y },
        { x: c.from.x, y: (c.from.y + c.to.y) / 2 },
        { x: c.to.x, y: (c.from.y + c.to.y) / 2 },
        { x: c.to.x, y: c.to.y }
      ];
      g.append('path')
        .datum(lineData)
        .attr('d', lineGenerator)
        .attr('stroke', '#020722')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('opacity', speedFactor > 0 ? 0 : 1)
        .transition()
        .delay(speedFactor > 0 ? i * 35 * speedFactor : 0)
        .duration(speedFactor > 0 ? 420 * speedFactor : 0)
        .attr('opacity', 1);
    });

    const defs = g.append('defs');
    nodes.forEach(d => {
      const team = teamData[d.id];
      if (team && team.image) {
        const pattern = defs.append('pattern')
          .attr('id', `pattern-${d.id}`)
          .attr('width', 1)
          .attr('height', 1)
          .attr('patternContentUnits', 'objectBoundingBox');
        pattern.append('image')
          .attr('xlink:href', team.image)
          .attr('width', 1)
          .attr('height', 1)
          .attr('preserveAspectRatio', 'xMidYMid slice');
      }
    });

    const getFill = (d) => {
      const team = teamData[d.id];
      if (team?.image) return `url(#pattern-${d.id})`;
      const name = team?.name;
      if (!name) return '#00A6A6';
      const parentId = graph.childToParent[d.id];
      if (!parentId) {
        return '#FFD700';
      }
      const match = matches[parentId];
      if (!match || !match.date) {
        return '#00A6A6';
      }
      const s1 = parseInt(match.score1 || 0);
      const s2 = parseInt(match.score2 || 0);
      const isTeam1 = match.team1 === name;
      if (s1 === 0 && s2 === 0) {
        return '#4CAF50';
      }
      if (s1 === s2) {
        return '#4CAF50';
      }
      if (isTeam1) {
        return s1 > s2 ? '#FFD700' : '#808080';
      } else {
        return s2 > s1 ? '#FFD700' : '#808080';
      }
    };

    const circles = g.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', speedFactor > 0 ? 0 : 20)
      .attr('fill', getFill)
      .attr('stroke', '#020722')
      .attr('opacity', speedFactor > 0 ? 0 : 1)
      .style('cursor', 'pointer')
      .on('click', (_, d) => setSelectedNode(d.id))
      .on('mouseover', (_, d) => setHoveredNode(d.id))
      .on('mouseout', () => setHoveredNode(null))
      .transition()
      .delay(speedFactor > 0 ? (_, i) => i * 25 * speedFactor : 0)
      .duration(speedFactor > 0 ? 600 * speedFactor : 0)
      .attr('r', 20)
      .attr('opacity', 1);

    if (!isFullRedraw) {
      g.selectAll('circle')
        .attr('fill', getFill);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, connections, graph, matches, teamData, numTeams]);

  const handleSave = () => {
    if (!selectedNode) return;
    const parentId = graph.childToParent[selectedNode];
    if (!parentId) {
      setSelectedNode(null);
      return;
    }
    const siblings = graph.parentToChildren[parentId];
    const rivalId = siblings.find(id => id !== selectedNode);
    const isLeafPair = !graph.parentToChildren[selectedNode];
    if (isLeafPair) {
      setTeamData(prev => ({
        ...prev,
        [selectedNode]: { ...prev[selectedNode], name: team1Input },
        [rivalId]: { ...prev[rivalId], name: team2Input }
      }));
    }
    const s1 = parseInt(score1Input) || 0;
    const s2 = parseInt(score2Input) || 0;
    let winnerData = null;
    if (s1 > s2) {
      winnerData = teamData[selectedNode];
    } else if (s2 > s1) {
      winnerData = teamData[rivalId];
    }
    if (winnerData) {
      setTeamData(prev => ({ ...prev, [parentId]: winnerData }));
    }
    setMatches(prev => ({ ...prev, [parentId]: { team1: team1Input, team2: team2Input, score1: score1Input, score2: score2Input, date: dateInput } }));
    setSelectedNode(null);
  };

  const handleCancel = () => {
    setTournamentName('');
    setDescription('');
    setNumTeams(8);
    setStartDate('');
    setEndDate('');
    setRegistrationCloseDate('');
    setRules('');
    setRuleList([]);
    setGenerateTrigger(0);
    setMatches({});
    setTeamData({});
    setGraph({ childToParent: {}, parentToChildren: {} });
    setNodes([]);
    setConnections([]);
    navigate('/manager');
  };

  return (
    <div className="d-flex vh-100 crear-torneo">
      {estado !== "En curso" && (
        <div className="col-3 p-3 overflow-auto" style={{ color: '#00A6A6' }}>
          <Form>
            <h2 className="mb-4">Crear Torneo</h2>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Torneo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del torneo"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad de Equipos:</Form.Label>
              <Form.Select
                value={numTeams}
                onChange={(e) => setNumTeams(parseInt(e.target.value))}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </Form.Select>
            </Form.Group>

            <h2 className="mt-5 mb-3">Fechas:</h2>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Inicio:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Fin:</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cierre de convocatoria:</Form.Label>
              <Form.Control
                type="date"
                value={registrationCloseDate}
                onChange={(e) => setRegistrationCloseDate(e.target.value)}
              />
            </Form.Group>

            <div className="mt-5">
              <h2 className="mb-3">Reglas</h2>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRule()}
                  placeholder="Escribe una regla..."
                />
                <Button variant="primary" onClick={addRule}>+</Button>
              </InputGroup>
              <ListGroup style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {ruleList.map((rule, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {rule}
                    <Button variant="link" className="text-danger" onClick={() => removeRule(index)}>×</Button>
                  </ListGroup.Item>
                ))}
                {ruleList.length === 0 && (
                  <ListGroup.Item className="text-muted fst-italic text-center">No hay reglas agregadas aún</ListGroup.Item>
                )}
              </ListGroup>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
              {estado === "Nuevo" && (
                <Button
                  variant="primary"
                  onClick={() => setGenerateTrigger((prev) => prev + 1)}
                >
                  Generar
                </Button>
              )}
              <Button
                variant="danger"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      )}

      <div className={`${estado === "En curso" ? "col-12" : "col-9"} position-relative overflow-auto`}>
        <svg ref={svgRef} className="w-100 h-100" style={{ background: '#f0f0f0' }} />
        {tournamentName && (
          <div className="position-absolute top-0 start-0 bg-dark text-white p-2 rounded" style={{ animation: 'fadeIn 1s ease-in-out', zIndex: 5 }}>
            {tournamentName}
          </div>
        )}
        <div className="position-absolute top-0 end-0 bg-white border border-dark p-1 rounded" style={{ pointerEvents: 'none', zIndex: 5, display: hoveredNode ? 'block' : 'none' }}>
          {teamData[hoveredNode]?.name || 'por definir'}
        </div>

        {(estado === "En curso" && user.role === "manager" ) && (
          <div
            className="position-absolute start-0 text-white p-2 rounded"
            style={{ animation: 'fadeIn 1s ease-in-out', zIndex: 5, top: '90%' }}
          >
            <button style={{ background: 'red' }} onClick={(e) => { e.stopPropagation(); volver('manager');  }}>Cancelar m</button>
          </div>
        )}

        {(estado === "En curso" && user.role === "user" ) && (
          <div
            className="position-absolute start-0 text-white p-2 rounded"
            style={{ animation: 'fadeIn 1s ease-in-out', zIndex: 5, top: '90%' }}
          >
            <button style={{ background: 'red' }} onClick={(e) => { e.stopPropagation(); volver('user');  }}>Cancelar m</button>
          </div>
        )}
        
      </div>

      <Modal show={!!selectedNode} onHide={() => setSelectedNode(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Configurar enfrentamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNode && (() => {
            const parentId = graph.childToParent[selectedNode];
            const siblings = graph.parentToChildren[parentId];
            const rivalId = siblings.find(id => id !== selectedNode);
            const isLeafPair = !graph.parentToChildren[selectedNode];
            return (
              <Form>
                <div className="d-flex justify-content-between mb-3 align-items-center">
                  {team1Image && <img src={team1Image} alt="Equipo 1" style={{ width: 50, marginRight: 10 }} />}
                  <Form.Control
                    type="text"
                    value={team1Input}
                    onChange={(e) => setTeam1Input(e.target.value)}
                    placeholder="Equipo 1"
                    readOnly={!isLeafPair}
                    className="me-2"
                  />
                  <span className="align-self-center">Vs</span>
                  <Form.Control
                    type="text"
                    value={team2Input}
                    onChange={(e) => setTeam2Input(e.target.value)}
                    placeholder="Equipo 2"
                    readOnly={!isLeafPair}
                    className="ms-2"
                  />
                  {team2Image && <img src={team2Image} alt="Equipo 2" style={{ width: 50, marginLeft: 10 }} />}
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="number"
                    value={score1Input}
                    onChange={(e) => setScore1Input(e.target.value)}
                    placeholder="Marcador 1"
                    className="me-2"
                  />
                  <span className="align-self-center">-</span>
                  <Form.Control
                    type="number"
                    value={score2Input}
                    onChange={(e) => setScore2Input(e.target.value)}
                    placeholder="Marcador 2"
                    className="ms-2"
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha del enfrentamiento:</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                </Form.Group>
              </Form>
            );
          })()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={() => setSelectedNode(null)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};