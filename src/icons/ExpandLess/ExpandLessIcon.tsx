import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const ExpandLessIcon = ({
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
      data-testid="expandless-icon-svg"
      {...props}
    >
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" fill={fill} />
    </svg>
  );
};

export default ExpandLessIcon;
