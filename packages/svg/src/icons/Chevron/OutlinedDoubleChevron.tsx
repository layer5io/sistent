import { FC } from 'react';
import { IconProps } from '../types';

export const OutlinedDoubleChevronIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 20.6"
      {...props}
    >
      <path d="M8.5,0L17,8.4l-2.2,2.2L8.4,4.3l-6.3,6.3L0,8.5L8.5,0z M8.5,10l8.5,8.5l-2.2,2.1l-6.4-6.3l-6.3,6.3L0,18.5L8.5,10z" />
    </svg>
  );
};

export default OutlinedDoubleChevronIcon;
