import { FC } from 'react';
import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const ChevronDownIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 20.6"
      {...props}
    >
      <path
        d="M0.800612 0.609497C1.22339 0.154198 1.93521 0.127834 2.39051 0.550612L8 5.83978L13.6095 0.550612C14.0648 0.127834 14.7766 0.154198 15.1994 0.609497C15.6222 1.0648 15.5958 1.77662 15.1405 2.1994L8.76551 8.1994C8.33387 8.60021 7.66614 8.60021 7.2345 8.1994L0.859497 2.1994C0.404198 1.77662 0.377834 1.0648 0.800612 0.609497Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronDownIcon;
