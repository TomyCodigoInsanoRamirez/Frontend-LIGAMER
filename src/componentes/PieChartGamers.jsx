import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChartGamers() {
  // Datos: Distribución de victorias por equipo en un torneo
  const data = [
    { id: 1, value: 20, label: 'Derrortas', color: '#7e1010ff' }, // Rojo
     { id: 2, value: 80, label: 'Victorias', color: '#0f690fff' }, // Verde
    // { id: 3, value: 15, label: 'Team Gamma', color: '#5555ff' }, // Azul
    // { id: 4, value: 10, label: 'Team Delta', color: '#ffaa00' }, // Naranja
  ];

  return (
    <div className="chart-container">
      {/* <h3 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>
        Tasa de desempeño del equipo
      </h3> */}
      <PieChart
        series={[
          {
            data,
            innerRadius: 50, // Donut chart
            outerRadius: 120,
            paddingAngle: 3,
            cornerRadius: 5,
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 15,
          },
        ]}
        width={400}
        height={300}
        slotProps={{
          legend: { hidden: false, position: { vertical: 'bottom', horizontal: 'middle' } },
        }}
      />
    </div>
  );
}