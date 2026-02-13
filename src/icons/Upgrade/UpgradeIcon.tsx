import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export const UpgradeIcon = ({
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
      {...props}
    >
      <path d="M16 18v2H8v-2zM11 7.99V16h2V7.99h3L12 4 8 7.99z" fill={fill} />
    </svg>
  );
};
export default UpgradeIcon;
