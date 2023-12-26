import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const ChatIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      {...props}
    >
      <path d="M15 3C7.82 3 2 7.925 2 14c0 3.368 1.793 6.378 4.611 8.396.072 1.536-.166 3.657-2.285 4.635a.5.5 0 0 0-.004.002A.5.5 0 0 0 4 27.5a.5.5 0 0 0 .5.5l.035-.002a.5.5 0 0 0 .008 0c2.434-.016 4.5-1.331 5.926-2.72.452-.442 1.082-.659 1.703-.542.91.173 1.856.264 2.828.264 7.18 0 13-4.925 13-11S22.18 3 15 3z" />
    </svg>
  );
};

export default ChatIcon;
