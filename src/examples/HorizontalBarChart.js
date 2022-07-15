import React from 'react';

import prefetch from '../modules/prefetch';
import BarChart from '../components/BarChart';

const prefetchData = prefetch([
  {
    url: '/data/horizontal.json',
    name: 'data',
    respRoot: 'data',
    initValue: {},
  },
]);

const HorizontalBarChart = ({ data }) => {
  const config = {
    title: 'Tradezi',
    mode: 'horizontal',
    data,
    style: {
      width: '600px',
      height: '600px',
    },
    color: '#ffe79b',
    legend: 'Revenue',
    tooltipHoverText: 'Revenue: {value}$',
  };

  return (
    <div className="container" style={{ maxWidth: '100%', margin: '48px auto' }}>
      <BarChart config={config} />
    </div>
  );
};

export default prefetchData(HorizontalBarChart);
