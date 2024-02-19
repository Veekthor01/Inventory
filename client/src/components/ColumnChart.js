import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-plugin-datalabels';

// Registering various chart elements for use in the Chart.js library.
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Component for rendering a Column Chart displaying departments and their staff count.
const ColumnChart = () => {
  const [columnData, setColumnData] = useState(null);

  // Fetch column chart data from the API when the component mounts
  useEffect(() => {
    fetchColumnData();
  }, []);

  // Function to fetch column chart data from the API
  const fetchColumnData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/department`);
      setColumnData(response.data);
    } catch (error) {
      console.error('Error fetching column chart data:', error);
    }
  };

// Process the column chart data and the necessary chart configuration.
  const getColumnData = () => {
    if (!columnData) return null;

    // Get the department names from the data
    const labels = columnData.map((data) => data.department);
    
    // Generate a random color for each department
    const colors = [];
    for (let i = 0; i < labels.length; i++) {
      colors.push(getRandomColor());
    }

    const data = {
      labels,
      datasets: [
        {
          label: 'Staff Count',
          data: columnData.map((data) => data.staff),
          backgroundColor: colors,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)', 
          borderWidth: 1, 
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Staff Count',
          },
          grid: {
            display: false,
          },
        },
        x: {
          title: {
            display: true,
            text: 'Department',
          },
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            display: false,
          },
          grid: {
            display: false,
          },
        },
      },
    };

    return { data, options };
  };

  return (
    <div>
      <h2>Departments and Staff</h2>
      <div className = "column-data">
        {columnData && (
          <Bar data={getColumnData().data} options={getColumnData().options} />
        )}
      </div>
    </div>
  );
};

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default ColumnChart;
