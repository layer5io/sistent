import React from 'react';

interface CopyIconProps {
  width: number;
  height: number;
  fill?: string;
  style?: React.CSSProperties;
  secondaryFill?: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({ width, height, fill = 'white', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    style={style}
  >
    <path d="M15.5 3H5.5C4.4 3 3.5 3.9 3.5 5V17H5.5V5H15.5V3ZM18.5 7H9.5C8.4 7 7.5 7.9 7.5 9V21C7.5 22.1 8.4 23 9.5 23H18.5C19.6 23 20.5 22.1 20.5 21V9C20.5 7.9 19.6 7 18.5 7ZM18.5 21H9.5V9H18.5V21Z" />
  </svg>
);

export default CopyIcon;
