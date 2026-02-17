import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL_NONE } from '../../constants/constants';
import { IconProps } from '../types';

export const GetAppIcon = ({
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
        d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"
        fill={fill}
      />
    </svg>
  );
};
export default GetAppIcon;
