import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';
import { FullScreenExitIcon } from '../Fullscreen/FullScreenExitIcon';

export const GetAppIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" fill="none" />
    </svg>
  );
};

export default GetAppIcon;
