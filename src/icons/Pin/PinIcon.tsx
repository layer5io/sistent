import React from 'react';
import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const PinIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
        <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
      </svg>
    );
  }
);

PinIcon.displayName = 'PinIcon';

export default PinIcon;
