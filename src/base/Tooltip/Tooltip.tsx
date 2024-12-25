import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from '@mui/material';
import React from 'react';

const Tooltip = React.forwardRef<HTMLDivElement, MuiTooltipProps>((props, ref) => {
  return <MuiTooltip {...props} ref={ref} />;
});

export default Tooltip;
