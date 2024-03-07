import { FC } from 'react';
import { KEPPEL_GREEN_FILL } from '../../constants/constants';
import { WHITE } from '../../theme';
import { IconProps } from '../types';

const SuccessIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...props}
    >
      <circle fill={props.stroke || KEPPEL_GREEN_FILL} cx="25" cy="25" r="25" />
      <polyline
        fill="none"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        points="38,15 22,33 12,25 "
      />
    </svg>
  );
};

export default SuccessIcon;
