import { FC } from 'react';
import {
  DEFAULT_FILL_NONE,
  DEFAULT_HEIGHT,
  DEFAULT_STROKE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_WIDTH
} from '../../constants/constants';
import { IconProps } from '../types';

export const OutlinedRectangleIcon: FC<IconProps> = ({
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
      viewBox="0 0 40 40"
      {...props}
    >
      <path d="M38 2H2V38H38V2Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default OutlinedRectangleIcon;
