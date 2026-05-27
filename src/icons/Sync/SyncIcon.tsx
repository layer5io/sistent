import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL_NONE } from '../../constants/constants';
import { IconProps } from '../types';

export const SyncIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  title,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm-6 6c0-1.01.25-1.97.7-2.8L5.24 5.74C4.46 6.97 4 8.43 4 10c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z"
        fill={fill}
      />
    </svg>
  );
};

export default SyncIcon;
