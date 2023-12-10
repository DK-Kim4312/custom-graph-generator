"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { saveAs } from 'file-saver';

const SaveableGraph = () => {
  const [xAxisLabel, setXAxisLabel] = useState('X-Axis');
  const [yAxisLabel, setYAxisLabel] = useState('Y-Axis');
  const [dataPoints, setDataPoints] = useState([]);
  const graphRef = useRef(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('graphData'));
    if (savedData) {
      setXAxisLabel(savedData.xAxisLabel || 'X-Axis');
      setYAxisLabel(savedData.yAxisLabel || 'Y-Axis');
      setDataPoints(savedData.dataPoints || []);
    }
  }, []);

  useEffect(() => {
    const graphData = { xAxisLabel, yAxisLabel, dataPoints };
    localStorage.setItem('graphData', JSON.stringify(graphData));
  }, [xAxisLabel, yAxisLabel, dataPoints]);

  const handleAddDataPoint = () => {
    const newDataPoint = prompt('Enter a data point:');
    if (newDataPoint !== null) {
      setDataPoints([...dataPoints, parseFloat(newDataPoint)]);
    }
  };

  const saveAsImage = () => {
    const canvasSave = document.getElementById('graphLine');
    canvasSave.toBlob(function(blob) {
      saveAs(blob, "graph.png");
    });
  };

  const chartData = {
    labels: dataPoints.map((_, index) => index + 1),
    datasets: [
      {
        label: yAxisLabel,
        data: dataPoints,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return (
    <div>
      <h2>Saveable Graph</h2>
      <div>
        <label>X-Axis Label:</label>
        <input
          type="text"
          value={xAxisLabel}
          onChange={(e) => setXAxisLabel(e.target.value)}
        />
      </div>
      <div>
        <label>Y-Axis Label:</label>
        <input
          type="text"
          value={yAxisLabel}
          onChange={(e) => setYAxisLabel(e.target.value)}
        />
      </div>
      <button onClick={handleAddDataPoint}>Add Data Point</button>
      <button onClick={saveAsImage}>Save as PNG</button>
      <Line id = "graphLine" data={chartData} options={chartOptions} ref={graphRef} />
    </div>
  );
};

export default SaveableGraph;
