import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import debounce from "lodash/debounce";

// Line chart original example
// https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89

const PADDING = 50;

function useResize(ref) {
  const [state, setState] = useState();
  useEffect(() => {
    const getSize = debounce(() => {
      if (!ref || !ref.current) {
        return;
      }

      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      setState({
        width,
        height
      });
    }, 1000);

    window.addEventListener("resize", getSize);
    getSize();
    return () => window.removeEventListener("resize", getSize);
  }, [ref]);

  return state;
}

const LineChart = (props) => {
  const [lineData, setLineData] = useState();
  const [markers, setMakers] = useState();

  const rootRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const size = useResize(rootRef);

  useEffect(() => {
    if (!size /* || !props.data*/) {
      return;
    }

    const data = props.data;
    const startDate = props.startDate;
    const endDate = props.endDate;
    const prediction = props.prediction;
    
    const { width, height } = size;

    var hi = new Date()
//     const xScale = d3
//       .scaleLinear()
//       .domain([0, data.length])
//       .range([PADDING, width - PADDING]);
     const xScale = d3
     .scaleTime()
     // .domain(d3.extent(data, function(d) { return d.Date; }))
     .domain([d3.min(data, function(d) { return d.Date; }), d3.timeDay.offset(d3.max(data, function(d) { return d.Date; }),90)])
     // .domain([d3.min(data, function(d) { return d.Date; }), d3.timeDay.offset(d3.max(data, function(d) { return d.Date; }),90)])
     .range([PADDING, width - PADDING]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Open))
      .range([height - PADDING/2, 0]);

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Open))
      .curve(d3.curveMonotoneX);

    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(width / 100);
    const yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(height / 50);

    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);

    setLineData(lineGenerator(data));
  }, [size, props]);

  return (
    <div className="chart-area" ref={rootRef}>
      {size && (
        <svg width={size.width} height={size.height}>
          <g id="axes">
            <g
              id="x-axis"
              ref={xAxisRef}
              transform={`translate(0, ${size.height - PADDING/2})`}
            />
            <g
              id="y-axis"
              ref={yAxisRef}
              transform={`translate(${PADDING}, 0)`}
            />
          </g>
          <g id="chart">
            {lineData && (
              <path stroke="#48bb78" className="chart-line" d={lineData} />
            )}
          </g>
        </svg>
      )}
    </div>
  );
};

export default LineChart;
