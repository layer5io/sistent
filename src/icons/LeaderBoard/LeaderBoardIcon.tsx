import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

const LeaderboardIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = 'currentColor',
  ...props
}: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 20 20"
    width={width}
    fill={fill}
    {...props}
  >
    <rect fill={fill} x="14" y="0" width="6" height="20" />
    <rect fill={fill} x="7" y="5" width="6" height="15" />
    <rect fill={fill} y="10" width="6" height="10" />
  </svg>
);

export default LeaderboardIcon;
