import { DEFAULT_HEIGHT, DEFAULT_WIDTH,KEPPEL_GREEN_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export const MoreVertIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = KEPPEL_GREEN_FILL,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="more-vert-icon-svg"
      {...props}
    >

    <path
    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
    fill={fill}
    />
    </svg>
  );
};

export default MoreVertIcon;