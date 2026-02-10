import { KEPPEL_GREEN_FILL, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

const DescriptionIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = KEPPEL_GREEN_FILL,
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
    {/* Example paths based on Material UI icon structure */}
    <path d="M8 4h28v40H8z" />
    {/* Additional path elements as needed */}
  </svg>
);

export default DescriptionIcon;
