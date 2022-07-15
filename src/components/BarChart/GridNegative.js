import React from 'react';
import { map } from 'lodash';
import { Tooltip } from 'react-tippy';
import { BAR_UNIT_SIZE } from './constants';

const GridNegative = ({ mode, yValues, scale, scaleFactor, tooltipHoverText, color }) => (
  <div className="chart-grid-negative">
    {map(yValues, (yValue, index) => {
      const normalizedValue = Math.abs(Math.min(yValue, 0));

      return (
        <div className="bar" key={index}>
          {yValue < 0 && <div className="bar-value">{yValue}</div>}
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
        </div>
      );
    })}
  </div>
);

export default GridNegative;
