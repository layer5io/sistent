import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';
export const ShareIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = '#51636B',
  style = {}
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 16"
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 4.95703V5.39068L11.0707 5.45201C7.68596 5.93554 5.29546 7.37866 3.62629 9.28628C2.43591 10.6467 1.60118 12.2567 1.04239 13.9499C3.51457 11.4886 6.75712 10.357 11 10.357H11.5V10.857V13.7499L17.2929 7.95703L11.5 2.16414V4.95703Z"
      stroke={fill}
      strokeWidth={1.5}
      fill={fill}
    />
  </svg>
);

export default ShareIcon;
