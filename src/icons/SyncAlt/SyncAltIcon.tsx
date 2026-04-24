import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL_NONE } from '../../constants/constants';
import { IconProps } from '../types';

export const SyncAltIcon = ({
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
        d="m18 12 4-4-4-4v3H3v2h15zM6 12l-4 4 4 4v-3h15v-2H6z"
        fill={fill}
      />
    </svg>
  );
};
export default SyncAltIcon;

