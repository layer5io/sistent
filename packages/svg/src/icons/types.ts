import { SVGAttributes } from 'react';

export type IconProps = {
  children?: never;
  color?: string;
  title?: string;
} & SVGAttributes<SVGElement>;
