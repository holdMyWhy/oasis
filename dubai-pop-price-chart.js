// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Get the canvas element
  const ctx = document.getElementById('dubaiChart').getContext('2d');
  
  // Years for the x-axis
  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 
    2021, 2022, 2023, 2024
  ];
  
  // Population data (in thousands)
  const populationData = [
    862, 954, 1046, 1137, 1229, 1321, 1517, 1713, 1777, 1841, 1905,
    2013, 2121, 2229, 2338, 2446, 2564, 2683, 2801, 2920, 3038,
    3175, 3312, 3450, 3588
  ];
  
  // Price index data
  const priceIndexData = [
    35, 45, 55, 65, 75, 85, 102.5, 120, 113.3, 106.7, 100,
    117.5, 135, 152.5, 170, 147.5, 125, 121.3, 117.5, 113.8, 110,
    127.5, 145, 157.5, 170
  ];
  
  // Create the chart
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Population (millions)',
          data: populationData,
          borderColor: '#3B82F6', // Blue
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          yAxisID: 'y',
          tension: 0.3
        },
        {
          label: 'Price Index (2010=100)',
          data: priceIndexData,
          borderColor: '#EF4444', // Red
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          yAxisID: 'y1',
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.datasetIndex === 0) {
                // Format population as millions
                label += (context.raw / 1000).toFixed(2) + 'M';
              } else {
                label += context.raw;
              }
              return label;
            }
          }
        },
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Population'
          },
          // Format the ticks as millions
          ticks: {
            callback: function(value) {
              return (value / 1000) + 'M';
            }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Price Index'
          },
          // Don't show grid lines for this axis
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
});