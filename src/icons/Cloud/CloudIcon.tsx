import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL_NONE } from '../../constants/constants';
import { IconProps } from '../types';

export const CloudIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  ...props
}) => {
  return (
    <svg 
      width={width} 
      height={height}
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      {...props}
    >
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96" fill={fill}></path>   
    </svg>
  );
};

export default CloudIcon;