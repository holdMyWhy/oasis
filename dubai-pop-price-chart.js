// Create a simpler, more direct approach without complex React component structure
function renderDubaiChart(container) {
  // Data for Dubai population and real estate price index
  const data = [
    { year: 2000, population: 862000, priceIndex: 35 },
    { year: 2001, population: 953800, priceIndex: 45 },
    { year: 2002, population: 1045600, priceIndex: 55 },
    { year: 2003, population: 1137400, priceIndex: 65 },
    { year: 2004, population: 1229200, priceIndex: 75 },
    { year: 2005, population: 1321000, priceIndex: 85 },
    { year: 2006, population: 1517000, priceIndex: 102.5 },
    { year: 2007, population: 1713000, priceIndex: 120 },
    { year: 2008, population: 1777000, priceIndex: 113.3 },
    { year: 2009, population: 1841000, priceIndex: 106.7 },
    { year: 2010, population: 1905000, priceIndex: 100 },
    { year: 2011, population: 2013000, priceIndex: 117.5 },
    { year: 2012, population: 2121000, priceIndex: 135 },
    { year: 2013, population: 2229000, priceIndex: 152.5 },
    { year: 2014, population: 2337500, priceIndex: 170 },
    { year: 2015, population: 2446000, priceIndex: 147.5 },
    { year: 2016, population: 2564000, priceIndex: 125 },
    { year: 2017, population: 2682500, priceIndex: 121.3 },
    { year: 2018, population: 2801000, priceIndex: 117.5 },
    { year: 2019, population: 2919500, priceIndex: 113.8 },
    { year: 2020, population: 3038000, priceIndex: 110 },
    { year: 2021, population: 3175000, priceIndex: 127.5 },
    { year: 2022, population: 3312000, priceIndex: 145 },
    { year: 2023, population: 3450000, priceIndex: 157.5 },
    { year: 2024, population: 3588000, priceIndex: 170 },
  ];

  // Create basic chart elements
  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;
  
  // Formatter for population values (in millions)
  const populationFormatter = (value) => `${(value / 1000000).toFixed(1)}M`;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return React.createElement('div', { 
        style: {
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, [
        React.createElement('p', { key: 'year', style: { fontWeight: 'bold', margin: '0 0 5px 0' } }, 
          `Year: ${label}`),
        React.createElement('p', { key: 'pop', style: { color: '#3B82F6', margin: '0 0 5px 0' } }, 
          `Population: ${populationFormatter(payload[0].value)}`),
        React.createElement('p', { key: 'price', style: { color: '#EF4444', margin: '0' } }, 
          `Price Index: ${payload[1].value}`)
      ]);
    }
    return null;
  };

  // Stats container
  const statsElement = React.createElement('div', {
    style: {
      marginBottom: '16px',
      padding: '8px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px'
    }
  }, [
    React.createElement('p', { key: 'pop-stat', style: { fontSize: '0.875rem', margin: '0 0 5px 0' } },
      'Population growth: 4.2x increase (from 0.86M to 3.59M)'),
    React.createElement('p', { key: 'price-stat', style: { fontSize: '0.875rem', margin: '0' } },
      'Real estate price growth: 4.9x increase (from index 35 to 170)')
  ]);

  // Chart component
  const chartElement = React.createElement(ResponsiveContainer, {
    width: '100%',
    height: 400
  }, 
    React.createElement(LineChart, {
      data: data,
      margin: { top: 10, right: 30, left: 20, bottom: 30 }
    }, [
      React.createElement(CartesianGrid, { key: 'grid', strokeDasharray: '3 3' }),
      React.createElement(XAxis, { 
        key: 'xaxis',
        dataKey: 'year', 
        interval: 4, 
        angle: -45, 
        textAnchor: 'end' 
      }),
      React.createElement(YAxis, { 
        key: 'yleft',
        yAxisId: 'left', 
        orientation: 'left', 
        stroke: '#3B82F6', 
        tickFormatter: populationFormatter,
        domain: [0, 4000000]
      }),
      React.createElement(YAxis, { 
        key: 'yright',
        yAxisId: 'right', 
        orientation: 'right', 
        stroke: '#EF4444',
        domain: [0, 180]
      }),
      React.createElement(Tooltip, { key: 'tooltip', content: CustomTooltip }),
      React.createElement(Legend, { key: 'legend' }),
      React.createElement(Line, { 
        key: 'line1',
        yAxisId: 'left',
        type: 'monotone', 
        dataKey: 'population', 
        name: 'Population', 
        stroke: '#3B82F6', 
        strokeWidth: 2,
        dot: { r: 3 },
        activeDot: { r: 6 }
      }),
      React.createElement(Line, { 
        key: 'line2',
        yAxisId: 'right',
        type: 'monotone', 
        dataKey: 'priceIndex', 
        name: 'Price Index (2010=100)', 
        stroke: '#EF4444', 
        strokeWidth: 2,
        dot: { r: 3 },
        activeDot: { r: 6 }
      })
    ])
  );

  // Footer notes
  const footerElement = React.createElement('div', {
    style: {
      marginTop: '16px',
      fontSize: '0.75rem',
      color: '#6b7280',
      textAlign: 'center'
    }
  }, [
    React.createElement('p', { key: 'note1', style: { margin: '0 0 5px 0' } },
      'Notes: Real estate price index uses 2010 as base year (100). Data interpolated between available points.'),
    React.createElement('p', { key: 'note2', style: { margin: '0' } },
      'Sources: Population data from Dubai Statistics Center, UN data, and World Population Review.')
  ]);

  // Main container
  const mainElement = React.createElement('div', {
    style: {
      width: '100%',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }
  }, [statsElement, chartElement, footerElement]);

  // Render to container
  ReactDOM.render(mainElement, container);
}