import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const FolderRoundedIcon = ({
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
      data-testid="folder-rounded-icon-svg"
      {...props}
    >
      <path
        d="M10 4c-0.55 0-1 0.45-1 1H4c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V8c0-1.1-0.9-2-2-2h-8l-2-2z"
        fill={fill}
      />
    </svg>
  );
};

export default FolderRoundedIcon;
