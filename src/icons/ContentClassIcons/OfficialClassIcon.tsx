import { FC } from 'react';
import { IconProps } from '../types';
export const OfficialClassIcon: FC<IconProps> = ({
  width = '16',
  height = '13',
  fill = '#293B43',
  style = {}
}) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 12 13"
    width={width}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.85613 1.20703L10.1439 1.20703C10.6167 1.20703 11 1.59034 11 2.06316V4.65658C11 7.6542 9.03375 10.2969 6.16254 11.1583C6.05652 11.1901 5.94349 11.1901 5.83746 11.1583C2.96626 10.2969 1 7.6542 1 4.65658V2.06316C1 1.59033 1.3833 1.20703 1.85613 1.20703ZM6.56129 5.43269L6 3.70601L5.43872 5.43269L3.62236 5.43269L5.09182 6.49984L4.53054 8.22651L6 7.15937L7.46947 8.22651L6.90818 6.49984L8.37764 5.43269L6.56129 5.43269Z"
      fill={fill}
    />
  </svg>
);

export default OfficialClassIcon;
