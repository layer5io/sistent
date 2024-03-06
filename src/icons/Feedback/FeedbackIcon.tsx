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
      viewBox="0 0 20 20"
      fill={props.fill}
      {...props}
    >
      <g clip-path="url(#clip0_27246_7300)">
        <path d="M18 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 20L4 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0ZM11 12H9V10H11V12ZM11 8H9V4H11V8Z" />
        <path d="M11 3.89062H9V8.00062H11V3.89062Z" fill={props.secondaryFill || 'transparent'} />
        <path d="M11 9.92188H9V12.0019H11V9.92188Z" fill={props.secondaryFill || 'transparent'} />
      </g>
      <defs>
        <clipPath id="clip0_27246_7300">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FeedbackIcon;
