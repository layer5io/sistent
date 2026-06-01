import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export const FilterNoneIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = KEPPEL_GREEN_FILL,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
        fill={fill}
      />
    </svg>
  );
};

export default FilterNoneIcon;

