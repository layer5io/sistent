import { FC } from 'react';
import { IconProps } from '../types';

export const ColumnIcon: FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#00D3A9"
      {...props}
    >
      <path d="M120-200v-560h220v560H120Zm250 0v-560h220v560H370Zm250 0v-560h220v560H620Z" />
    </svg>
  );
};

export default ColumnIcon;
