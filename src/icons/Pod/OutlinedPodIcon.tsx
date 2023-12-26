import { FC } from 'react';
import { IconProps } from '../types';

export const OutlinedPodIcon: FC<IconProps> = ({ width, height, ...props }) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 124 124"
    {...props}
  >
    <rect
      x="2.5"
      y="2.5"
      width="119"
      height="119"
      rx="21.5"
      fill="white"
      stroke="#359AC0"
      strokeWidth="5"
    />
  </svg>
);

export default OutlinedPodIcon;
