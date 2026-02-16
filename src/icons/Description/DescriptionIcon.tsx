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
    viewBox="0 0 48 48"
    fill={fill}
    data-testid="description-icon-svg"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* SVG path data from Material UI Description icon will go here */}
    <path d="M8 4h28v40H8z" />
  </svg>
);

export default DescriptionIcon;
