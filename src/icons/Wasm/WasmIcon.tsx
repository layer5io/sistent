import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

const WasmIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={props.fill}
      {...props}
    >
      <g>
        <path d="M61.4379 0C61.4379 0.176471 61.4379 0.352941 61.4379 0.539216C61.4379 6.87255 56.3039 12.0049 49.9722 12.0049C43.6389 12.0049 38.5065 6.87092 38.5065 0.539216C38.5065 0.352941 38.5065 0.176471 38.5065 0L0 0V100H100V0H61.4379Z" />
        <path
          d="M23.2285 53.8905H29.856L34.3805 77.9869H34.4622L39.9001 53.8905H46.0994L51.0112 78.2827H51.1076L56.2644 53.8905H62.7644L54.3184 89.2974H47.7416L42.8707 65.201H42.7432L37.5292 89.2974H30.8298L23.2285 53.8905ZM70.2367 53.8905H80.6844L91.0602 89.2974H84.2236L81.9671 81.4183H70.0651L68.3233 89.2974H61.6648L70.2367 53.8905ZM74.2138 62.6176L71.3233 75.6078H80.32L77.0014 62.6176H74.2138Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath>
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WasmIcon;
