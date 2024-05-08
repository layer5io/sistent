import { FC } from 'react';
import { IconProps } from '../types';

export const DesignerBottomRightIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 147 218"
      {...props}
    >
      <path d="M0,123.3L70.2,0v93.4c-7.9,1.6-13.9,8.6-13.9,17c0,9.6,7.8,17.3,17.3,17.3s17.3-7.8,17.3-17.3 c0-8.5-6.2-15.6-14.3-17.1V0l70,123.5c-23,14.9-34.9,35.1-35.6,60.7H34.7C33.7,157.4,21.4,137.5,0,123.3z" />
      <path d="M73.6,121.4c6,0,10.9-4.9,10.9-10.9c0-6-4.9-10.9-10.9-10.9s-10.9,4.9-10.9,10.9 C62.7,116.6,67.6,121.4,73.6,121.4z" />
      <rect x="12.7" y="199.6" width="121.3" height="18.4" />
    </svg>
  );
};

export default DesignerBottomRightIcon;
