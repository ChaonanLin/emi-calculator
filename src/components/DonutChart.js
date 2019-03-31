// reference to this resource: https://codepen.io/zeroskillz/pen/mPmENy
// redit to Ted

import React, { Component } from "react";
import ".././App.css";

class DonutChart extends Component {
  state = {
    donutval: 55
  };

  render() {
    const defaultProps = {
      percentage: this.props.percentage,
      valuelabel: "Completed",
      size: 180,
      strokewidth: 20
    };
    const halfsize = defaultProps.size * 0.5;
    const radius = halfsize - defaultProps.strokewidth * 0.5;
    const circumference = 2 * Math.PI * radius;
    const strokeval = (defaultProps.percentage * circumference) / 100;
    const dashval = strokeval + " " + circumference;

    const trackstyle = { strokeWidth: defaultProps.strokewidth };
    const indicatorstyle = {
      strokeWidth: defaultProps.strokewidth,
      strokeDasharray: dashval
    };
    const rotateval = "rotate(-90 " + halfsize + "," + halfsize + ")";
    return (
      <div>
        <svg
          width={defaultProps.size}
          height={defaultProps.size}
          className="donutchart"
        >
          <circle
            r={radius}
            cx={halfsize}
            cy={halfsize}
            transform={rotateval}
            style={trackstyle}
            className="donutchart-track"
          />
          <circle
            r={radius}
            cx={halfsize}
            cy={halfsize}
            transform={rotateval}
            style={indicatorstyle}
            className="donutchart-indicator"
          />
          <text
            className="donutchart-text"
            x={halfsize}
            y={halfsize}
            style={{ textAnchor: "middle" }}
          >
            <tspan
              className="donutchart-text-label"
              x={halfsize}
              y={halfsize - 10}
            >
              EMI
            </tspan>
            <tspan
              className="donutchart-text-val"
              x={halfsize}
              y={halfsize + 15}
            >
              ${this.props.emi}
            </tspan>
          </text>
        </svg>
      </div>
    );
  }
}

export default DonutChart;
