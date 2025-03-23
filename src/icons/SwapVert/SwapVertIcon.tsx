import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const SwapVertIcon = ({
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
      data-testid="swap-vert-icon-svg"
      {...props}
    >
      <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM8 7V13h2V7h3L9 3 5 7h3z" fill={fill} />
    </svg>
  );
};

export default SwapVertIcon;
