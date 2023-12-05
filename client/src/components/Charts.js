import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// array of labels representing different categories
const labels = ['Components', 'Computers', 'Accessories', 'Personnel', 'Licenses', 'Suppliers'];
const buttonLabels = ['', '', '', '', '', ''];

//* Component for displaying the chart
const ChartPage = () => {
  // State for storing chart data
  const [chartData, setChartData] = useState(null);
  const [visibleSlices, setVisibleSlices] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);

  // Fetch chart data from the API when the component mounts
  useEffect(() => {
    fetchChartData();
  }, []);

  // Function to fetch chart data from the API
  const fetchChartData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/chart_data`);
      const data = response.data[0]; 
      setChartData(data);

      // Set all slices to be initially visible
      setVisibleSlices(new Array(labels.length).fill(true));
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // Function to generate random colors for the chart
  const generateColors = (count) => {
    const colors = [];
    const letters = '0123456789ABCDEF';

    for (let i = 0; i < count; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  };

  // Function to get chart data based on visible slices
  const getChartData = () => {
    if (!chartData) return null;

    const counts = Object.values(chartData);
    const colors = generateColors(labels.length);
    const visibleCounts = counts.filter((count, index) => visibleSlices[index]);
    const visibleColors = colors.filter((color, index) => visibleSlices[index]);

    const data = {
      datasets: [
        {
          data: visibleCounts,
          backgroundColor: visibleColors,
          hoverOffset: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              return labels[context.dataIndex];
           },
          },
        },
      },
    };

    return { data, options };
  };

  // Function to toggle visibility of chart slices
  const toggleSliceVisibility = (index) => {
    const newVisibleSlices = [...visibleSlices];
    newVisibleSlices[index] = !newVisibleSlices[index];
    setVisibleSlices(newVisibleSlices);
    // Toggle clicked buttons state
    const updatedClickedButtons = [...clickedButtons];
    if (updatedClickedButtons.includes(index)) {
      const indexToRemove = updatedClickedButtons.indexOf(index);
      updatedClickedButtons.splice(indexToRemove, 1);
    } else {
      updatedClickedButtons.push(index);
    }
    setClickedButtons(updatedClickedButtons);
  };

  // Effect to register chart elements and tooltips when chart data is available
  useEffect(() => {
    if (chartData) {
      Chart.register(ArcElement, Tooltip);
    }
  }, [chartData]);

  return (
    <div>
      <h2>Item Inventory</h2>
      <div className="chart-data">
        {chartData && (
          <Pie data={getChartData().data} options={getChartData().options} />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {chartData &&
           buttonLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => toggleSliceVisibility(index)}
              style={{ backgroundColor: generateColors(labels.length)[index], 
                padding: '4px',
                borderRadius: '2px',
                marginLeft: '2px',
                marginTop: '15px',
                paddingTop: '5px',
                cursor: 'pointer',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                textDecoration: clickedButtons.includes(index) ? 'line-through' : '', 
                transition: 'color 0.2s, box-shadow 0.2s, text-decoration 0.2s',
                border: clickedButtons.includes(index) ? '3px solid #262626' : 'none',
              }}
              aria-label={`Toggle visibility for ${label}`}
            >
              {label}
            </button>
          ))}
      </div>
    </div>
  );
};

Chart.register(ArcElement);
export default ChartPage;
