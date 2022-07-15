# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## SIMPLE BAR CHART

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
