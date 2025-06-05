import React from 'react';

const SparklineChart = ({ data, width = 100, height = 40, positive }) => {
  if (!data || data.length === 0) return null;

  // Calculate min and max for scaling
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Calculate points for the sparkline
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  // Calculate fill points for the gradient area
  const fillPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="sparkline" style={{ width, height }}>
      <svg width={width} height={height} className="sparkline-svg">
        {/* Gradient fill area */}
        <path
          d={`M ${fillPoints}`}
          fill={positive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)'}
          strokeWidth="0"
        />
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={positive ? '#00ff88' : '#ff4444'}
          strokeWidth="1.5"
        />
        {/* End point */}
        <circle
          cx={width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r="2"
          fill={positive ? '#00ff88' : '#ff4444'}
        />
      </svg>
    </div>
  );
};

export default SparklineChart; 