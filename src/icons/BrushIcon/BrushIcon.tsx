import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

const BrushIcon = ({
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
    data-testid="brush-icon-svg"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7 14c-1.1 0-2 .9-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.1-.9-2-2-2m13.71-6.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75zM12.12 8.46 3 17.59V21h3.41l9.12-9.12-3.41-3.42zM21 3h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-8 4h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1z" />
  </svg>
);

export default BrushIcon;
