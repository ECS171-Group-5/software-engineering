import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import debounce from "lodash/debounce";

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
  const [predictionLine, setPredictionLine] = useState();

  const rootRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const size = useResize(rootRef);

  useEffect(() => {
    if (!size) {
      return;
    }

    var data = props.data;
    const startDate = props.startDate;
    const endDate = props.endDate;
    const prediction = props.prediction;

    var slicedData = [];
     for (var index = data.length-1; index>0; index--) {
          if (data[index].Date<startDate)
               break;
          slicedData.push(data[index]);
     }
     data = slicedData;

    var originalPrice = data.length>0?slicedData[slicedData.length-1].Close:0;
    var predictedPrice = originalPrice;
    if (prediction===0)
          predictedPrice*=1.1;
    else if (prediction===1)
          predictedPrice*=0.9;
    
    const { width, height } = size;

     const xScale = d3
     .scaleTime()
     .domain([startDate, Math.max(new Date(), endDate)])
     .range([PADDING, width - PADDING]);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(d3.min(data, (d) => d.Close), predictedPrice-predictedPrice/100), Math.max(d3.max(data, (d)=>d.Close), predictedPrice)])
      .range([height - PADDING/2, 0]);

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Close))
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

    var predictionLineData = [
         {
              Date: startDate,
              Close: originalPrice
         },
         {
              Date: endDate,
              Close: predictedPrice
         }
    ]
    setPredictionLine(lineGenerator(predictionLineData));
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
              <path className="chart-line" d={lineData} />
            )}
          </g>
          <g id="chart">
            {predictionLine && (
              <path className="chart-line-2" d={predictionLine} />
            )}
          </g>
        </svg>
      )}
    </div>
  );
};

export default LineChart;
