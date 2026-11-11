import React from 'react';
import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const OutlinedPinIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, fill = DEFAULT_FILL_NONE, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={fill}
        {...props}
      >
        <path d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4h4m3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1z" />
      </svg>
    );
  }
);

OutlinedPinIcon.displayName = 'OutlinedPinIcon';

export default OutlinedPinIcon;
