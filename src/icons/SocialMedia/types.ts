export interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
}

export interface SlackIconProps extends IconProps {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
}
