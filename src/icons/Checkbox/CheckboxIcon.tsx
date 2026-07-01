import React from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

type CheckboxIconProps = IconProps & {
  innerRectStroke?: string;
};

export const CheckboxIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  innerRectStroke = 'currentColor',
  ...props
}: CheckboxIconProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke={innerRectStroke}
      strokeWidth="1.5"
    />
  </svg>
);

export default CheckboxIcon;
