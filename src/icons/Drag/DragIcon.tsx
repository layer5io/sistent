import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const DragIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,

  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      fill={props.fill}
      width={width}
      height={height}
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M600 1440c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240Zm720 0c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240ZM600 720c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240Zm720 0c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240ZM600 0c132.36 0 240 107.64 240 240S732.36 480 600 480 360 372.36 360 240 467.64 0 600 0Zm720 0c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240S1187.64 0 1320 0Z"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default DragIcon;
