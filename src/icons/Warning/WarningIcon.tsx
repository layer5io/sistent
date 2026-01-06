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
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
  );
};

export default WarningIcon;
