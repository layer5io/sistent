import { FC } from 'react';
import { IconProps } from '../types';

const SuccessIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...props}
    >
      <circle fill="#25AE88" cx="25" cy="25" r="25" />
      <polyline
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2" // Changed to "strokeWidth" from "stroke-width"
        strokeLinecap="round" // Changed to "strokeLinecap" from "stroke-linecap"
        strokeLinejoin="round" // Changed to "strokeLinejoin" from "stroke-linejoin"
        strokeMiterlimit="10" // Changed to "strokeMiterlimit" from "stroke-miterlimit"
        points="38,15 22,33 12,25 " // Changed to lowercase "points" from "points"
      />
    </svg>
  );
};

export default SuccessIcon;
