import { FC } from 'react';
import { IconProps } from '../types';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, KEPPEL_GREEN_FILL } from '../../constants/constants';

type KeppelTallRoundedRectangleIconProps = {
  primaryFill: string;
} & IconProps;

export const KeppelTallRoundedRectangleIcon: FC<KeppelTallRoundedRectangleIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  primaryFill = KEPPEL_GREEN_FILL,
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
      <rect width="32" height="40" rx="5" fill={primaryFill} />
    </svg>
  );
};

export default KeppelTallRoundedRectangleIcon;
