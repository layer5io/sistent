import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

function CrossCircleIcon({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = 'currentColor',
  ...props
}: IconProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      style={{ ...props.style }}
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2Zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59Z"
          fillOpacity=".54"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h24v24H0z" fill={props.stroke || '#FFFFF'} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CrossCircleIcon;

export { CrossCircleIcon };
