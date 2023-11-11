import React from 'react';
import { CARIBBEAN_GREEN_FILL, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';

const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = CARIBBEAN_GREEN_FILL,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    </svg>
  );
};

export default FilterIcon;
