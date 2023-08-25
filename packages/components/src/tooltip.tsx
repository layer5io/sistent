import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import React from 'react';

export function Tooltip(props: TooltipProps) {
  return <MuiTooltip {...props} />;
}
