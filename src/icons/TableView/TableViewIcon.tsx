import React from 'react';

interface TableViewIconProps {
  width?: string;
  height?: string;
  fill?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export const TableViewIcon: React.FC<TableViewIconProps> = ({
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
    viewBox="0 -960 960 960"
    width={width}
    fill={fill}
    fillOpacity={opacity}
  >
    <path d="M80-160v-160h160v160H80Zm240 0v-160h560v160H320ZM80-400v-160h160v160H80Zm240 0v-160h560v160H320ZM80-640v-160h160v160H80Zm240 0v-160h560v160H320Z" />
  </svg>
);

export default TableViewIcon;
