import {
  DEFAULT_FILL_NONE,
  DEFAULT_HEIGHT,
  DEFAULT_STROKE,
  DEFAULT_WIDTH
} from '../../constants/constants';
import { IconProps } from '../types';

export const TachometerIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  stroke = DEFAULT_STROKE,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M288 32C128.9 32 0 160.9 0 320c0 52.8 14.3 102.3 39.1 144.8 5.6 9.6 16.3 15.2 27.4 15.2h443c11.1 0 21.8-5.6 27.4-15.2C561.8 422.3 576 372.8 576 320c0-159.1-128.9-288-288-288zm0 64c14.7 0 26.6 10.1 30.3 23.7-1.1 2.3-2.6 4.2-3.5 6.7l-9.2 27.7c-5.1 3.5-11 6-17.6 6-17.7 0-32-14.3-32-32S270.3 96 288 96zM96 384c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm48-160c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm246.8-72.4l-61.3 184C343.1 347.3 352 364.5 352 384c0 11.7-3.4 22.6-8.9 32H232.9c-5.5-9.5-8.9-20.3-8.9-32 0-33.9 26.5-61.4 59.9-63.6l61.3-184c4.2-12.6 17.7-19.5 30.4-15.2 12.6 4.2 19.4 17.8 15.2 30.4zm14.7 57.2l15.5-46.6c3.5-1.3 7.1-2.2 11.1-2.2 17.7 0 32 14.3 32 32s-14.3 32-32 32c-11.4 0-20.9-6.3-26.6-15.2zM480 384c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
        fill={fill}
        stroke={stroke}
      />
    </svg>
  );
};

export default TachometerIcon;
