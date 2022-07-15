import React from 'react';
import { map } from 'lodash';
import { Tooltip } from 'react-tippy';
import { BAR_UNIT_SIZE } from './constants';

const GridPositive = ({ mode, yValues, scale, scaleFactor, tooltipHoverText, color }) => (
  <div className="chart-grid">
    {map(yValues, (yValue, index) => {
      const normalizedValue = Math.max(yValue, 0);
      return (
        <div className="bar" key={index}>
          <Tooltip
            title={tooltipHoverText.replace('{value}', yValue)}
            position="right"
            trigger="mouseenter"
            className="bar-rect"
          >
            <div
              style={{
                height:
                  mode === 'vertical' ? `${(normalizedValue / (scaleFactor * scale)) * BAR_UNIT_SIZE}px` : 'unset',
                width:
                  mode === 'horizontal' ? `${(normalizedValue / (scaleFactor * scale)) * BAR_UNIT_SIZE}px` : 'unset',
                backgroundColor: color,
              }}
            />
          </Tooltip>
          {yValue >= 0 && <div className="bar-value">{yValue}</div>}
        </div>
      );
    })}
  </div>
);

export default GridPositive;
