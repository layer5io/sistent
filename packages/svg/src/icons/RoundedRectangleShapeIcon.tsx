import { FC } from 'react';
import { IconProps } from './types';

export const RoundedRectangleShapeIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      {...props}
    >
      <rect width="40" height="40" rx="9" />
    </svg>
  );
};

export default RoundedRectangleShapeIcon;
