import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL } from '../../constants/constants';
import { IconProps } from '../types';

type KeppelRectangleIconProps = {
  primaryFill: string;
} & IconProps;

export const KeppelRectangleIcon: FC<KeppelRectangleIconProps> = ({
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
      viewBox="0 0 40 40"
      {...props}
    >
      <path d="M40 0H0V40H40V0Z" fill={primaryFill} />
    </svg>
  );
};

export default KeppelRectangleIcon;
