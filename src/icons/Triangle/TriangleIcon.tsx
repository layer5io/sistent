import { FC } from 'react';
import { IconProps } from '../types';

export const TriangleIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 28.364"
      {...props}
    >
      <path
        d="m18.603 2.181 11.967 20.727c1.12 1.939 -0.279 4.364 -2.519 4.364H4.116c-2.239 0 -3.638 -2.425 -2.519 -4.364L13.564 2.181c1.12 -1.939 3.919 -1.939 5.039 0Z"
        strokeWidth="1.4549333333333334"
      />
    </svg>
  );
};

export default TriangleIcon;
