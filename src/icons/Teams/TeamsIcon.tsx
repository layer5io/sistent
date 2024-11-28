import React from 'react';

interface TeamsIconProps {
  width: string | number;
  height: string | number;
  fill: string;
  primaryFill?: string;
  secondaryFill?: string;
  style?: React.CSSProperties;
}

const TeamsIcon: React.FC<TeamsIconProps> = ({
  width,
  height,
  fill,
  primaryFill = '#51636B',
  secondaryFill = '#00B39F',
  style = {}
}) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 18 18"
    width={width}
    fill={fill}
  >
    <path
      fill={secondaryFill}
      d="M3.8,5.4c0.4,0,0.8,0.1,1.1,0.3c-0.1,1.1,0.2,2.1,0.8,3c-0.4,0.7-1.1,1.2-2,1.2c-0.6,0-1.2-0.2-1.6-0.7
	c-0.4-0.4-0.7-1-0.7-1.6s0.2-1.2,0.7-1.6S3.2,5.4,3.8,5.4z M14.2,5.4c0.6,0,1.2,0.2,1.6,0.7c0.4,0.4,0.7,1,0.7,1.6s-0.2,1.2-0.7,1.6
	c-0.4,0.4-1,0.7-1.6,0.7c-0.9,0-1.6-0.5-2-1.2c0.6-0.8,1-1.9,0.8-3C13.4,5.6,13.8,5.4,14.2,5.4z M0,14.4v-1.1c0-1,1.4-1.9,3.3-2.2
	c-0.4,0.5-0.7,1.2-0.7,2v1.3H0z M18,14.4h-2.6v-1.3c0-0.8-0.3-1.5-0.7-2c1.9,0.3,3.3,1.1,3.3,2.2V14.4z"
    />
    <path
      fill={primaryFill}
      d="M9,3.6c0.7,0,1.4,0.3,1.9,0.8c0.5,0.5,0.8,1.2,0.8,1.9S11.3,7.6,10.9,8C10.4,8.5,9.7,8.8,9,8.8S7.6,8.5,7.1,8
	C6.7,7.6,6.4,6.9,6.4,6.2s0.3-1.4,0.8-1.9C7.6,3.8,8.3,3.6,9,3.6z"
    />
    <path fill={primaryFill} d="M4.1,13.1c0-1.6,2.2-2.8,4.9-2.8s4.9,1.3,4.9,2.8v1.3H4.1V13.1z" />
  </svg>
);

export default TeamsIcon;
