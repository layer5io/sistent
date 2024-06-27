import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';
export const DeploymentsIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = '#51636B',
  style = {}
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill={fill}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.0021 5.83516L13.8271 4.66016L8.54375 9.94349L9.71875 11.1185L15.0021 5.83516ZM18.5354 4.66016L9.71875 13.4768L6.23542 10.0018L5.06042 11.1768L9.71875 15.8352L19.7188 5.83516L18.5354 4.66016ZM0.34375 11.1768L5.00208 15.8352L6.17708 14.6602L1.52708 10.0018L0.34375 11.1768Z" />
  </svg>
);

export default DeploymentsIcon;
