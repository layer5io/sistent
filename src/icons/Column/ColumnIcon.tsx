import React, { SVGProps } from 'react';
import { CARIBBEAN_GREEN_FILL, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';

const ColumnIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = CARIBBEAN_GREEN_FILL,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={fill}
      {...props}
    >
      <path d="M120-200v-560h220v560H120Zm250 0v-560h220v560H370Zm250 0v-560h220v560H620Z" />
    </svg>
  );
};

export default ColumnIcon;
