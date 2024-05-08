import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

function AlertIcon({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = 'currentColor',
  ...props
}: IconProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#fff"
      style={props.style}
    >
      <path
        d="M11.6042 11.6667H9.89591V7.49999H11.6042V11.6667ZM11.6042 15H9.89591V13.3333H11.6042V15ZM1.35425 17.5H20.1459L10.7501 1.66666L1.35425 17.5Z"
        fill={fill}
      />
    </svg>
  );
}

export default AlertIcon;

export { AlertIcon };
