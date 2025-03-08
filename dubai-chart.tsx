import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DubaiChart = () => {
  // Combined and interpolated data for Dubai population and real estate price index
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

  // Formatter for population values (in millions)
  const populationFormatter = (value) => {
    return `${(value / 1000000).toFixed(1)}M`;
  };

  // Formatter for price index values
  const priceIndexFormatter = (value) => {
    return `${value}`;
  };

  // Custom tooltip to display both metrics
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
          <p className="font-semibold">{`Year: ${label}`}</p>
          <p className="text-blue-600">{`Population: ${populationFormatter(payload[0].value)}`}</p>
          <p className="text-red-600">{`Price Index: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Dubai Population and Real Estate Price Index (2000-2024)</h2>
        
        <div className="mb-4 px-2 py-1 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">
            Population growth: 4.2x increase (from 0.86M to 3.59M)
          </p>
          <p className="text-sm text-gray-700">
            Real estate price growth: 4.9x increase (from index 35 to 170)
          </p>
        </div>
        
        <div className="h-64 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                interval={4} 
                angle={-45} 
                textAnchor="end" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#3B82F6" 
                tickFormatter={populationFormatter}
                domain={[0, 4000000]}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#EF4444" 
                tickFormatter={priceIndexFormatter}
                domain={[0, 180]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="population" 
                name="Population" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="priceIndex" 
                name="Price Index (2010=100)" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Notes: Real estate price index uses 2010 as base year (100). Data interpolated between available points.</p>
          <p>Sources: Population data from Dubai Statistics Center, UN data, and World Population Review.</p>
          <p>Real estate data approximated from Dubai Land Department, REIDIN, and market reports.</p>
        </div>
      </div>
    </div>
  );
};

export default DubaiChart;