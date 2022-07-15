import React from 'react';

import prefetch from '../modules/prefetch';
import BarChart from '../components/BarChart';

const prefetchData = prefetch([
  {
    url: '/data/vertical.json',
    name: 'data',
    respRoot: 'data',
    initValue: {},
  },
]);

const VerticalBarChart = ({ data }) => {
  const config = {
    title: 'Tradezi',
    mode: 'vertical',
    data,
    style: {
      width: '600px',
      height: '480px',
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

export default prefetchData(VerticalBarChart);
