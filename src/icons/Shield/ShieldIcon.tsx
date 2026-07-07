import { FC } from 'react';
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_FILL
} from '../../constants/constants';
import { IconProps } from '../types';

export const ShieldIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL,
  style,
  ...props
}) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      transform="translate(3.000000, 0.000000)"
      fill={fill}
      d="M9,0l-9.7,4.4v6.5C-0.8,17,3.4,22.6,9,24c5.6-1.4,9.7-7,9.7-13.1V4.4L9,0L9,0z"
    />
  </svg>
);

export default ShieldIcon;
