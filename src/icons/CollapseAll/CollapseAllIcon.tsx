import React from 'react';

interface CollapsAllIconProps {
  height?: string;
  width?: string;
  fill?: string;
  strokeWidth?: string;
  style?: React.CSSProperties;
}

const CollapsAllIcon: React.FC<CollapsAllIconProps> = ({
  height = '24',
  width = '24',
  fill = 'none',
  strokeWidth = '2',
  style
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    width={width}
    style={style}
  >
    <path
      d="M17 16l-5-5-5 5"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 10l-5-5-5 5"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CollapsAllIcon;
