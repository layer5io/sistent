import { FC } from 'react';
import { IconProps } from './types';

export const FilledTallRoundedRectangleIcon: FC<IconProps> = ({
  width,
  height,
  fill = 'currentColor',
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
      <rect width="32" height="40" rx="5" fill={fill} />
    </svg>
  );
};

export default { Filled: FilledTallRoundedRectangleIcon };
