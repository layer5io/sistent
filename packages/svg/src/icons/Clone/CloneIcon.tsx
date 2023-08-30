import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const CloneIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M14.5 0h-10A1.5 1.5 0 0 0 3 1.5V3H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V13h1.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 14.5 0Zm-3.188 14.5H1.688a.188.188 0 0 1-.188-.188V4.688a.187.187 0 0 1 .188-.188H3v7A1.5 1.5 0 0 0 4.5 13h7v1.313a.188.188 0 0 1-.188.187Zm3-3H4.688a.188.188 0 0 1-.188-.188V1.688a.187.187 0 0 1 .188-.188h9.625a.188.188 0 0 1 .187.188v9.624a.188.188 0 0 1-.188.188Z" />
    </svg>
  );
};

export default CloneIcon;
