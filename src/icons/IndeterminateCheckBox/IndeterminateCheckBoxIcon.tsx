import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL_NONE } from '../../constants/constants';
import { IconProps } from '../types';

export const IndeterminateCheckBoxIcon = ({
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
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 10H7v-2h10z"
        fill={fill}
      />
    </svg>
  );
};
export default IndeterminateCheckBoxIcon;
