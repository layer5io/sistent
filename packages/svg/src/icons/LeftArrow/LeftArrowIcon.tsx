import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const LeftArrowIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
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
      <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293" />
    </svg>
  );
};

export default LeftArrowIcon;
