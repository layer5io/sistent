import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export const LanOutlinedIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL,
  title,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M13,22h8v-7h-3v-4h-5V9h3V2H8v7h3v2H6v4H3v7h8v-7H8v-2h8v2h-3V22z M10,7V4h4v3H10z M9,17v3H5v-3H9z M19,17v3h-4v-3H19z" />
    </svg>
  );
};

export default LanOutlinedIcon;