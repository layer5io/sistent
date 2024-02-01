import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const RoundTriangleShapeIcon: FC<IconProps> = ({
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
      <path d="M26.0622 3.5C23.3679 -1.16667 16.6321 -1.16667 13.9378 3.5L1.06218 25.8013C-1.63212 30.4679 1.73576 36.3013 7.12436 36.3013H32.8756C38.2642 36.3013 41.6321 30.4679 38.9378 25.8013L26.0622 3.5Z" />
    </svg>
  );
};

export default RoundTriangleShapeIcon;
