import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';
export const OpenIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = '#293B43',
  style = {}
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 16"
    fill={fill}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.0651 12.6667H3.73177V3.33333H8.39844V2H3.73177C2.99177 2 2.39844 2.6 2.39844 3.33333V12.6667C2.39844 13.4 2.99177 14 3.73177 14H13.0651C13.7984 14 14.3984 13.4 14.3984 12.6667V8H13.0651V12.6667ZM9.73177 2V3.33333H12.1251L5.57177 9.88667L6.51177 10.8267L13.0651 4.27333V6.66667H14.3984V2H9.73177Z" />
    <clipPath id="clip0_32146_29398">
      <rect width="16" height="16" fill="white" transform="translate(0.398438)" />
    </clipPath>
  </svg>
);

export default OpenIcon;
