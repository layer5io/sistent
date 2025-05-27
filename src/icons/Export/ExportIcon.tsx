import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const DownloadIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = '#455a64',
  style = {}
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    fill={fill}
    style={style}
  >
    <path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"></path>
  </svg>
);

export default DownloadIcon;
