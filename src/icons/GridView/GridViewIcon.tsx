import React from 'react';

interface GridViewIconProps {
  width?: string;
  height?: string;
  fill?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export const GridViewIcon: React.FC<GridViewIconProps> = ({
  width = '24',
  height = '28.8',
  fill,
  opacity,
  style = {}
}) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    fill={fill}
    fillOpacity={opacity}
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path>
  </svg>
);

export default GridViewIcon;
