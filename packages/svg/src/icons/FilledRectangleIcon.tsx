import { FC } from 'react';
import { IconProps } from './types';

export const FilledRectangleIcon: FC<IconProps> = ({
  width,
  height,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path d="M40 0H0V40H40V0Z" fill={fill} {...props} />
    </svg>
  );
};

export default { Filled: FilledRectangleIcon };
