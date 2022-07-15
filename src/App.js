import React from 'react';
import './App.scss';

import VerticalBarChart from './examples/VerticalBarChart';
import HorizontalBarChart from './examples/HorizontalBarChart';

const App = () => (
  <div className="App">
    <h1>Bar Chart</h1>
    <VerticalBarChart />

    <hr />

    <h1>Horizontal Bar Chart</h1>
    <HorizontalBarChart />
  </div>
);

export default App;
