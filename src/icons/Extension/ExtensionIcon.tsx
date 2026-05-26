import React, { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';
import { DetailGroupStyle, MainGroupStyle, injectKeyframes } from './styles';

injectKeyframes();

export interface ExtensionIconProps extends IconProps {
  isHoverEffect?: boolean;
}

export const ExtensionIcon: FC<ExtensionIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  isHoverEffect = false,
  fill,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-12 -18 237.46 237.57"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={isHoverEffect ? 'extension-icon-go' : undefined}
      {...props}
    >
      <g className="extension-g-main" fill={fill} style={MainGroupStyle}>
        <polygon
          opacity="1.0"
          points="106.83,108.86 106.83,158.67 150.19,133.88"
        />
        <polygon
          opacity="0.8"
          points="100.64,98.15 100.64,49.34 58.21,73.66"
        />
        <path
          opacity="0.8"
          d="M15.53,158.5c8.32,13.38,19.59,24.72,32.92,33.12v-52.18l-32.92,19.06Z"
        />
        <polygon
          opacity="0.8"
          points="100.64,158.44 100.64,109.22 58.11,133.85"
        />
        <polygon
          opacity="1.0"
          points="54.63,188.52 97.71,163.89 54.63,138.98"
        />
        <polygon
          opacity="0.8"
          points="153.13,188.78 153.13,139.32 110.12,163.92"
        />
        <path
          opacity="0.8"
          d="M195.27,152.75c7.16-13.35,11.48-28.44,12.17-44.48l-44.84,25.64,32.67,18.85Z"
        />
        <polygon
          opacity="1.0"
          points="54.63,78.74 54.63,128.71 97.86,103.68"
        />
        <path
          opacity="0.8"
          d="M100.64,0c-16.43.48-31.9,4.78-45.56,12.04l45.56,26.19V0Z"
        />
        <polygon
          opacity="1.0"
          points="54.63,18.91 54.63,68.58 97.89,43.78"
        />
        <path
          opacity="0.8"
          d="M48.44,15.89c-13.33,8.4-24.6,19.75-32.92,33.14l32.92,19V15.89Z"
        />
        <path
          opacity="1.0"
          d="M0,107.4c.57,16.52,4.99,32.06,12.41,45.75l33.34-19.3L0,107.4Z"
        />
        <path
          opacity="1.0"
          d="M12.41,54.37C5.03,68,.61,83.46,0,99.9l45.79-26.25L12.41,54.37Z"
        />
        <path
          opacity="0.8"
          d="M55,195.43c13.68,7.29,29.18,11.6,45.64,12.09v-38.18l-45.64,26.1Z"
        />
        <path
          opacity="1.0"
          d="M159.32,191.44c13.32-8.46,24.59-19.88,32.87-33.33l-32.87-18.97v52.29Z"
        />
        <path
          opacity="1.0"
          d="M106.83,207.52c16.42-.48,31.89-4.78,45.54-12.03l-45.54-26.33v38.36Z"
        />
        <polygon
          opacity="0.8"
          points="48.44,128.26 48.44,79.26 5.88,103.66"
        />
      </g>
      <g className="extension-g-detail" fill={fill} style={DetailGroupStyle}>
        <polygon
          opacity="1.0"
          points="106.83,48.92 106.83,98.49 149.79,73.62"
        />
        <polygon
          opacity="1.0"
          points="159.32,128.66 202.55,103.94 159.32,79.09"
        />
        <polygon
          opacity="0.8"
          points="153.13,68.4 153.13,19.25 110.32,43.79"
        />
        <polygon
          opacity="0.8"
          points="153.13,128.44 153.13,78.83 110.22,103.68"
        />
        <path
          opacity="1.0"
          d="M152.85,12.28C139.08,4.88,123.44.49,106.83,0v38.66l46.02-26.38Z"
        />
        <path
          opacity="1.0"
          d="M192.04,49.16c-8.27-13.34-19.47-24.68-32.72-33.09v52.03l32.72-18.94Z"
        />
        <path
          opacity="0.8"
          d="M207.46,99.63c-.64-16.28-5.02-31.6-12.32-45.12l-32.97,19.09,45.28,26.03Z"
        />
      </g>
    </svg>
  );
};

export default ExtensionIcon;
