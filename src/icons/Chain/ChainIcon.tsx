import React from 'react';

interface ChainIconProps {
  width: string;
  height: string;
  fill?: string;
  style?: React.CSSProperties;
  secondaryFill?: string;
}

const ChainIcon: React.FC<ChainIconProps> = ({ width, height, style, fill = '#3C494F' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 34 18"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path d="M3.95098 9.00094C3.95098 6.16576 6.2556 3.86114 9.09078 3.86114H15.7228V0.710938H9.09078C4.5147 0.710938 0.800781 4.42486 0.800781 9.00094C0.800781 13.577 4.5147 17.2909 9.09078 17.2909H15.7228V14.1407H9.09078C6.2556 14.1407 3.95098 11.8361 3.95098 9.00094ZM10.7488 10.6589H24.0128V7.34294H10.7488V10.6589ZM25.6708 0.710938H19.0388V3.86114H25.6708C28.506 3.86114 30.8106 6.16576 30.8106 9.00094C30.8106 11.8361 28.506 14.1407 25.6708 14.1407H19.0388V17.2909H25.6708C30.2469 17.2909 33.9608 13.577 33.9608 9.00094C33.9608 4.42486 30.2469 0.710938 25.6708 0.710938Z" />
  </svg>
);

export default ChainIcon;
