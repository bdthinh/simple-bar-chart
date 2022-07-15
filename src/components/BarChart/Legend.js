import React from 'react';

const Legend = ({ legend, color }) => (
  <div className="legend">
    <span className="legend-color" style={{ backgroundColor: color }} />
    <span>{legend}</span>
  </div>
);

export default Legend;
