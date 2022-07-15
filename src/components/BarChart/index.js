import React from 'react';
import { branch, renderNothing, withProps, compose } from 'recompose';
import { every, flow, path, pathOr, isEmpty, identity } from 'lodash/fp';
import { BAR_UNIT_SIZE, BAR_TITLE_SIZE, X_AXIS_SIZE } from './constants';

import 'react-tippy/dist/tippy.css';
import './bar-chart.scss';

import Legend from './Legend';
import XAxis from './XAxis';
import GridPositive from './GridPositive';
import GridNegative from './GridNegative';

const conditionalRender = branch(
  flow(
    path('config.data'),
    isEmpty,
  ),
  renderNothing,
  identity,
);

const withScaleRespectHeight = withProps(({ config: { data, style } = {} }) => {
  const yValues = pathOr([], 'y', data);
  let scale = 1;

  const height = path('height', style);
  if (height && height.includes('px')) {
    const heightInNumber = Number(height.split('px')[0]);
    if (!isNaN(heightInNumber)) {
      const chartAreaHeight = heightInNumber - BAR_TITLE_SIZE - X_AXIS_SIZE;
      scale = (Math.max(...yValues) * BAR_UNIT_SIZE) / chartAreaHeight;
    }
  }
  return { scale };
});

const withNegativeAndPositiveRender = withProps(({ config: { data } = {} }) => {
  const yValues = pathOr([], 'y', data);

  const allPositiveY = every(value => value >= 0, yValues);
  const allNegativeY = every(value => value < 0, yValues);

  return { allPositiveY, allNegativeY };
});

const enhance = compose(
  conditionalRender,
  withScaleRespectHeight,
  withNegativeAndPositiveRender,
);

const BarChart = ({
  config: { title, mode, data, style, color, legend, tooltipHoverText = '' } = {},
  scale,
  allPositiveY,
  allNegativeY,
}) => {
  const xValues = pathOr([], 'x', data);
  const yValues = pathOr([], 'y', data);

  return (
    <div className="chart" style={style}>
      <div className="title">{title}</div>

      <div className={mode}>
        <div className="chart-area">
          <Legend color={color} legend={legend} />
          {!allNegativeY && (
            <GridPositive
              mode={mode}
              yValues={yValues}
              scale={scale}
              scaleFactor={allPositiveY ? 1 : 2}
              tooltipHoverText={tooltipHoverText}
              color={color}
            />
          )}
          {!allPositiveY && (
            <GridNegative
              mode={mode}
              yValues={yValues}
              scale={scale}
              scaleFactor={allNegativeY ? 1 : 2}
              tooltipHoverText={tooltipHoverText}
              color={color}
            />
          )}
        </div>

        <XAxis values={xValues} />
      </div>
    </div>
  );
};

export default enhance(BarChart);
