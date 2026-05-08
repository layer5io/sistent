import { DEFAULT_FILL, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const BarchartIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="barchart-icon-svg"
      {...props}
    >
      <path
        d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"
        fill={fill}
      />
    </svg>
  );
};

export default BarchartIcon;
