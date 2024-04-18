import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { ONYX_BLACK } from '../../theme';
import { IconProps } from '../types';

export const ChevronLeft = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M12 16a.997.997 0 01-.707-.293l-5-5a.999.999 0 010-1.414l5-5a.999.999 0 111.414 1.414L8.414 10l4.293 4.293A.999.999 0 0112 16z"
        fill={fill || ONYX_BLACK}
      />
    </svg>
  );
};

export default ChevronLeft;
