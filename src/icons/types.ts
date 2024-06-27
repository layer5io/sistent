import React from 'react';

export type IconProps = {
  children?: never;
  color?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
} & React.SVGProps<SVGSVGElement>;

export type CustomIconProps = {
  primaryFill?: string;
  secondaryFill?: string;
} & IconProps;
