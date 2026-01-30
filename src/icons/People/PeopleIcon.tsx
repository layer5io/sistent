import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

const PeopleIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  ...props
}: IconProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 29.4c0-4.256 8.661-6.4 13-6.4s13 2.144 13 6.4V35H3zM23 14c0 3.867-3.133 7-7 7s-7-3.133-7-7 3.133-7 7-7 7 3.133 7 7m17 4c0 2.762-2.237 5-5 5s-5-2.238-5-5 2.237-5 5-5 5 2.238 5 5" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M31 35v-5.6c0-1.364-.532-2.511-1.28-3.437C31.57 25.322 33.583 25 35 25c3.337 0 10 1.787 10 5.333V35z"
    />
  </svg>
);

export default PeopleIcon;
