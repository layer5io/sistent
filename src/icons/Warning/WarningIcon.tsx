import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const WarningIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="WarningIcon"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"></path>
    </svg>
  );
};

export default WarningIcon;
