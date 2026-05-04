import { DEFAULT_HEIGHT, DEFAULT_WIDTH,DEFAULT_FILL_NONE } from 
'../../constants/constants';
import { IconProps } from '../types';

export const ChevronRight = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
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
        d="M8 16.997a1 1 0 01-.707-1.707l5-5a.999.999 0 000-1.414l-5-5a.999.999 
        0 111.414-1.414l5 5a3 3 0 010 4.243l-5 5A.997.997 0 018 16.997z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronRight;
