import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { ONYX_BLACK } from '../../theme';
import { IconProps } from '../types';

export const ChevronRight = ({
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
        d="M8 4a.997.997 0 01.707.293l5 5a.999.999 0 010 1.414l-5 5A.999.999 0 116.293 14.293L10.586 10 6.293 5.707A.999.999 0 018 4z"
        fill={fill || ONYX_BLACK}
      />
    </svg>
  );
};

export default ChevronRight;