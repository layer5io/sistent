import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export const SupervisedUserCircleIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL,
  ...props
}: IconProps): JSX.Element => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      data-testid="supervised-user-circle-icon-svg"
      {...props}
    >
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zm4.75 6c-.75 1.5-3.11 1.5-3.88 0-.49-.95.12-2.06 1.16-2.06h1.56c1.04 0 1.65 1.11 1.16 2.06zm1.25-3c-.83 0-1.5-.67-1.5-1.5S13.67 8 14.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={fill} />
    </svg>
  );
};

export default SupervisedUserCircleIcon;