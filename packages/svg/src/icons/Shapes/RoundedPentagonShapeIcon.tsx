import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const RoundedPentagonShape: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
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
      <path d="M17.6249 0.76393C19.0411 -0.254644 20.9589 -0.254642 22.3751 0.76393L38.3341 12.2416C39.7503 13.2602 40.3429 15.0657 39.8019 16.7138L33.7063 35.2851C33.1653 36.9332 31.6137 38.049 29.8631 38.049H10.1369C8.38627 38.049 6.83477 36.9332 6.29382 35.2851L0.198047 16.7138C-0.342914 15.0657 0.249705 13.2602 1.66596 12.2416L17.6249 0.76393Z" />
    </svg>
  );
};

export default RoundedPentagonShape;
