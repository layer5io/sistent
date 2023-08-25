import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

export function Tooltip(props: TooltipProps) {
  return <MuiTooltip {...props} />;
}
