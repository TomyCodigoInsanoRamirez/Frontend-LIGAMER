import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Datos de ejemplo: puedes reemplazar por tus datos reales
const data = [
  { torneo: 'LIGAMER 2022', encuentros: 45, ganados: 28, perdidos: 17 },
  { torneo: 'LIGAMER 2023', encuentros: 62, ganados: 40, perdidos: 22 },
  { torneo: 'Copa Pro 2024', encuentros: 58, ganados: 36, perdidos: 22 },
  { torneo: 'LIGAMER 2025', encuentros: 73, ganados: 52, perdidos: 21 },
  { torneo: 'Elite Cup 2025', encuentros: 65, ganados: 41, perdidos: 24 },
];

export default function TorneosLineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        {/* Línea principal: total de encuentros */}
        <Line
          type="monotone"
          dataKey="encuentros"
          stroke="#1976d2"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Encuentros totales"
        />

        {/* Línea de encuentros ganados */}
        <Line
          type="monotone"
          dataKey="ganados"
          stroke="#00c853"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Encuentros ganados"
        />

        {/* Línea de encuentros perdidos */}
        <Line
          type="monotone"
          dataKey="perdidos"
          stroke="#d50000"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Encuentros perdidos"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="torneo" angle={-20} textAnchor="end" tickMargin={10} />
        <YAxis label={{ value: 'Encuentros', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        {/* <Legend /> */}

        
      </LineChart>
    </ResponsiveContainer>
  );
}
