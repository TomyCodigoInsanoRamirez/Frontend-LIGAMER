import React from 'react';
import { RadarChart } from '@mui/x-charts/RadarChart';

export default function RadarChartGamers() {
  // const dataset = [
  //   { metric: 'Kills', alpha: 90, beta: 70, gamma: 50 },
  //   { metric: 'Deaths', alpha: 20, beta: 40, gamma: 60 },
  //   { metric: 'Assists', alpha: 60, beta: 50, gamma: 70 },
  // ];

  return (
    <div className="chart-container" style={{ color: '#fff' }}>
      {/* <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Aporte individual
      </h3> */}
      <RadarChart
        height={300}
        series={[{ label: 'Victorias', data: [1, 8, 2, 2, 5, 3] },{ label: 'Derrotas', data: [5, 3, 8, 6, 2, 7] }]}
        radar={{
            max: 21,
            metrics: ['Adrian', 'Tomas', 'Rubén', 'Alisson', 'Chucho', 'Ricardo'],
        }}
        />
    </div>
  );
}