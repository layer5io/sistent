import {
  DEFAULT_FILL_NONE,
  DEFAULT_HEIGHT,
  DEFAULT_STROKE,
  DEFAULT_WIDTH
} from '../../constants/constants';
import { IconProps } from '../types';

export const CaretDownIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  stroke = DEFAULT_STROKE,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
        fill={fill}
        stroke={stroke}
      />
    </svg>
  );
};

export default CaretDownIcon;
