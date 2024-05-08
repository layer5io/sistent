import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

type KeppelApplicationIconProps = {
  primaryFill?: string;
  secondaryFill?: string;
} & IconProps;
const FeedbackIcon: FC<KeppelApplicationIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      {...props}
    >
      <path
        stroke="none"
        d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM13 14H11V12H13V14ZM13 10H11V6H13V10Z"
      />
      <line x1="12" y1="6" x2="12" y2="10" stroke="inherit" stroke-width="2" />
      <line x1="12" y1="12" x2="12" y2="14" stroke="inherit" stroke-width="2" />
    </svg>
  );
};

export default FeedbackIcon;
