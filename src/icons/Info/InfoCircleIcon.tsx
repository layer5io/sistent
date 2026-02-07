import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export function InfoCircleIcon({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = KEPPEL_GREEN_FILL,
  ...props
}: IconProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"
        fill={fill}
      />
    </svg>
  );
}

export default InfoCircleIcon;
