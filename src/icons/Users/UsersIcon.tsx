import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL } from '../../constants/constants';
import { CustomIconProps } from '../types';

const DEFAULT_PRIMARY_FILL = '#51636B';

export const UsersIcon: FC<CustomIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  primaryFill = DEFAULT_PRIMARY_FILL,
  secondaryFill = KEPPEL_GREEN_FILL,
  style,
  ...props
}) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 18 18"
    width={width}
    fill={primaryFill}
    {...props}
  >
    <path
      fill={primaryFill}
      d="M12.6,13.9v1.8H0v-1.8c0,0,0-3.6,6.3-3.6S12.6,13.9,12.6,13.9z M9.4,5.4c0-0.6-0.2-1.2-0.5-1.8C8.6,3.1,8.1,2.7,7.5,2.5C6.9,2.3,6.3,2.2,5.7,2.3C5.1,2.4,4.5,2.7,4.1,3.2c-0.4,0.4-0.7,1-0.9,1.6C3.1,5.4,3.2,6,3.4,6.6S4,7.7,4.5,8c0.5,0.3,1.1,0.5,1.8,0.5c0.8,0,1.6-0.3,2.2-0.9C9.1,7,9.4,6.2,9.4,5.4z"
    />
    <path
      fill={secondaryFill}
      d="M12.5,10.4c0.6,0.4,1,1,1.3,1.6c0.3,0.6,0.5,1.3,0.5,2v1.8H18v-1.8C18,13.9,18,10.7,12.5,10.4z M11.7,2.3c-0.6,0-1.2,0.2-1.7,0.5c0.5,0.8,0.8,1.7,0.8,2.6c0,0.9-0.3,1.9-0.8,2.6c0.5,0.3,1.1,0.5,1.7,0.5c0.8,0,1.6-0.3,2.2-0.9c0.6-0.6,0.9-1.4,0.9-2.2s-0.3-1.6-0.9-2.2C13.3,2.6,12.5,2.3,11.7,2.3z"
    />
  </svg>
);

export default UsersIcon;
