import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {getPieChartData} from './../utils/Service/usuario';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

export default function PieChartGamers() {
  // Datos: Distribución de victorias por equipo en un torneo
  const data = [
    { id: 1, value: 20, label: 'Derrortas', color: '#7e1010ff' }, // Rojo
     { id: 2, value: 80, label: 'Victorias', color: '#0f690fff' }, // Verde
    // { id: 3, value: 15, label: 'Team Gamma', color: '#5555ff' }, // Azul
    // { id: 4, value: 10, label: 'Team Delta', color: '#ffaa00' }, // Naranja
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => { 
    getPieChartData(5)
      .then((data) => {
        setChartData(data.data); 
        //console.log("Data chart: "+JSON.stringify(data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Estado chartData actualizado:", chartData);
  }, [chartData]);

  const chartDataa = useMemo(() => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    console.log("Total valor:", total);

    return chartData.map((item) => {
      const percentage = total === 0 ? 0 : Math.round((item.value / total) * 100);
      console.log(`Item: ${item.label}, Value: ${item.value}, Percentage: ${percentage}%`);
      return {
        ...item,
        value: percentage, // valor para mostrar
      };
    });
  }, [chartData]);

  useEffect(() => {
    console.log("Estado chartDataaaaaaa actualizado:", chartDataa);
  }, [chartData]);
  
  return (
    <div className="chart-container">
      {/* <h3 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>
        Tasa de desempeño del equipo
      </h3> */}
      <PieChart
        series={[
          {
            data: chartDataa,
            innerRadius: 50, // Donut chart
            outerRadius: 120,
            paddingAngle: 3,
            cornerRadius: 5,
            arcLabel: (item) => `${item.formattedValue}%`,
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