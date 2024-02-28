import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

function ReadIcon({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = 'currentColor',
  ...props
}: IconProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 20 19"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0px"
      y="0px"
      fill={fill}
      style={{ ...props.style }}
      {...props}
    >
      <path
        d="M20,7c0-0.7-0.4-1.3-0.9-1.7L10,0L1,5.3C0.4,5.7,0,6.3,0,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2L20,7z M10,12L1.7,6.8
          L10,2l8.3,4.8L10,12z"
        fill={fill}
      />
    </svg>
  );
}

export default ReadIcon;

export { ReadIcon };
