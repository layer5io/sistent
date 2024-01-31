import { DEFAULT_FILL, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const CircleIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      data-testid="circle-icon-svg"
      {...props}
    >
      <path
        d="M11.366 38.035c-9.96-4.769-14.17-16.71-9.401-26.672A19.996 19.996 0 0 1 28.634 1.96c9.96 4.77 14.17 16.71 9.401 26.673-4.768 9.961-16.708 14.171-26.669 9.402Z"
        fill={fill}
      />
    </svg>
  );
};

export default CircleIcon;
