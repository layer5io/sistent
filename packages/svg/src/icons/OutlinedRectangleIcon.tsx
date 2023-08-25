import { FC } from 'react';
import { IconProps } from './types';

export const OutlinedRectangleIcon: FC<IconProps> = ({
  width,
  height,
  stroke = 'currentColor',
  strokeWidth = '2',
  ...props
}) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path d="M38 2H2V38H38V2Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default { Outlined: OutlinedRectangleIcon };
