import { FC } from 'react';
import { KEPPEL_GREEN_FILL } from '../../constants/constants';
import { IconProps } from '../types';

const CalenderIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 24"
      stroke="none"
      {...props}
    >
      <path d="M14 9H4V11H14V9Z" />
      <path d="M2 18V7H16V13H18V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H15V0H13V2H5V0H3V2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4L0 18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H12V18H2Z" />
      <path d="M11 13H4V15H11V13Z" />
      <path
        d="M15.256 20V17.744H13V16.244H15.256V14H16.756V16.244H19V17.744H16.756V20H15.256Z"
        fill={props.stroke || KEPPEL_GREEN_FILL}
      />
    </svg>
  );
};

export default CalenderIcon;
