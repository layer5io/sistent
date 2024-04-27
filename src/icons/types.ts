import { BoxProps, SxProps, Theme } from '@mui/material';
import React from 'react';
import { IconSize } from './SistentIcon';

export type IconProps = {
  children?: React.ReactNode;
  color?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  size?: IconSize;
  sx?: SxProps<Theme>;
} & Omit<BoxProps, 'sx'> &
  React.SVGProps<SVGSVGElement>;
