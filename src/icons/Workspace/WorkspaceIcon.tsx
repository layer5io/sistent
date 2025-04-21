import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL } from '../../constants/constants';
import { CustomIconProps } from '../types';

export const WorkspaceIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  secondaryFill = KEPPEL_GREEN_FILL,
  fill = 'currentColor',
  ...props
}: CustomIconProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={fill}
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path
        d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
        stroke={fill}
        fill={fill}
      ></path>
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke={secondaryFill}
        fill={secondaryFill}
      ></rect>
      <circle cx="17.5" cy="17.5" r="3.5" stroke={fill} fill={fill}></circle>
    </svg>
  );
};

export default WorkspaceIcon;
