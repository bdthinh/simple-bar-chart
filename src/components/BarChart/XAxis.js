import React from 'react';
import { map } from 'lodash';

const XAxis = ({ values }) => (
  <div className="chart-axis-x">
    {map(values, (value, index) => (
      <div className="bar" key={index}>
        <span className="bar-name">{value}</span>
      </div>
    ))}
  </div>
);

export default XAxis;
