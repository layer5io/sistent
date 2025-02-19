import { SvgIcon as MuiSvgIcon, type SvgIconProps as MuiSvgIconProps } from '@mui/material';
import React from 'react';

export const SvgIcon = React.forwardRef<SVGSVGElement, MuiSvgIconProps>((props, ref) => {
  return <MuiSvgIcon {...props} ref={ref} />;
});

export default SvgIcon;
export type { MuiSvgIconProps as SvgIconProps };
