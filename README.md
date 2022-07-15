# SIMPLE BAR CHART

This application is designed to render a bar chart (both vertical and horizontal by fetching data from AJAX request). This application is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Development

`npm start`

### Build

`npm run build`

### Serve the build

```
npm install -g serve
serve -s build
```

## Description

This application is designed to render a bar chart (both vertical and horizontal by fetching data from AJAX request).

To render a chart, we need:

1. data source: { x, y }. The data structure is as follows:

```
	{
		x: array of strings
		y: array of numbers (can be negative)
	}
```

2. Fetch data to put in config. A skeleton will be render while waiting data response from AJAX request

Example config:

```
const config = {
  title: 'Daily revenue', // title of the chart
  mode: 'vertical', // vertical or horizontal
  data, // { x, y } data
  style: {
    width: '600px', // width
    height: '480px', // height
  },
  color: '#ffe79b', // bar color
  legend: 'Revenue', // legend note
  tooltipHoverText: 'Revenue: {value}', // tooltip mouseenter
};
```

This chart is built with simple css that support negative values with single dataset and legend. Both vertical and horizontal are supported.

## Self-Review

I'm stuck at making grid line by css myself so I've skipped that part.
