import { FC } from 'react';
import { IconProps } from '../types';

const CalenderIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M17 10H7V12H17V10ZM19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM14 14H7V16H14V14Z" />
      <path
        d="M18.375 20.5V18.625H16.5V17.375H18.375V15.5H19.625V17.375H21.5V18.625H19.625V20.5H18.375Z"
        fill="#00B39F"
      />
    </svg>
  );
};

export default CalenderIcon;
