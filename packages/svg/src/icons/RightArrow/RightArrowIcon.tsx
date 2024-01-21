import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const RightArrowIcon = ({
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
      <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707" />
    </svg>
  );
};

export default RightArrowIcon;
