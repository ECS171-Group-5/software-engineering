import React from 'react';

const StatusBar = ({index}) => {
    return (
        <svg viewBox="0 0 1000 85">
          <circle
            cx={index==="0"?"380":index==="1"?"500":"620"}
            cy="25"
            r="20"
            fill="#ccc"
          />
          <circle
            cx="380"
            cy="25"
            r="3"
            fill="#022851"
          />
          <rect 
            x="390"
            y="24"
            width="100"
            height="2"
            fill="#57B8FF"
          />
          <circle
            cx="500"
            cy="25"
            r="3"
            fill="#022851"
          />
          <rect 
            x="510"
            y="24"
            width="100"
            height="2"
            fill="#57B8FF"
          />
          <circle
            cx="620"
            cy="25"
            r="3"
            fill="#022851"
          />
          <text
              x="380"
              y="65"
              fill="#022851"
              fontSize="8px"
              fontWeight="700"
              textAnchor="middle"
          >Select</text>
          <text
              x="500"
              y="65"
              fill="#022851"
              fontSize="8px"
              fontWeight="700"
              textAnchor="middle"
          >Configure</text>
          <text
              x="620"
              y="65"
              fill="#022851"
              fontSize="8px"
              fontWeight="700"
              textAnchor="middle"
          >Result</text>
        </svg>
    )
    
}

export default StatusBar;
