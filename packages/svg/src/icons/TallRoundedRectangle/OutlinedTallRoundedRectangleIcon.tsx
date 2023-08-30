<<<<<<< HEAD:packages/svg/src/icons/OutlinedTallRoundedRectangleIcon.tsx
import { FC } from 'react';
import { IconProps } from './types';
=======
import React, { FC } from 'react';
import { IconProps } from '../types';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_STROKE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_FILL_NONE
} from '../../constants/constants';
>>>>>>> 99f4cb67de640d1c9c8a255700cb217be0a9ee25:packages/svg/src/icons/TallRoundedRectangle/OutlinedTallRoundedRectangleIcon.tsx

export const OutlinedTallRoundedRectangleIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  stroke = DEFAULT_STROKE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  fill = DEFAULT_FILL_NONE,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 40"
      {...props}
    >
      <rect
        width="28"
        height="36"
        x="2"
        y="2"
        rx="5"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default OutlinedTallRoundedRectangleIcon;
