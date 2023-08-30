import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const CreateNewIcon: FC<IconProps> = ({
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
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M3 17.46v3.04c0 0.28 0.22 0.5 0.5 0.5h3.04c0.13 0 0.26 -0.05 0.35 -0.15L17.81 9.94l-3.75 -3.75L3.15 17.1c-0.1 0.1 -0.15 0.22 -0.15 0.36zM20.71 7.04a0.996 0.996 0 0 0 0 -1.41l-2.34 -2.34a0.996 0.996 0 0 0 -1.41 0l-1.83 1.83 3.75 3.75 1.83 -1.83z" />
    </svg>
  );
};

export default CreateNewIcon;
