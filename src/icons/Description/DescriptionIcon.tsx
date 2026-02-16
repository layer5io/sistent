import { KEPPEL_GREEN_FILL, DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL_NONE } from '../../constants/constants';
import { IconProps } from '../types';

const DescriptionIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  ...props
}: IconProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    data-testid="description-icon-svg"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* SVG path data from Material UI Description icon will go here */}
   <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z" fill={fill}></path>
  </svg>
);

export default DescriptionIcon;
