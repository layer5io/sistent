import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL } from '../../constants/constants';
import { IconProps } from '../types';

const TrendingUpIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = KEPPEL_GREEN_FILL,
  ...props
}: IconProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.414 16.432 0 15.018l7.071-7.071 6.364 6.364 4.243-4.243-1.743-1.742 6.692-1.793-1.793 6.692-1.742-1.742-5.657 5.656-6.364-6.364z" />
  </svg>
);

export default TrendingUpIcon;
