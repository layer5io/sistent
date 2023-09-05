import { Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';
import React from 'react';

export function Tooltip(props: TooltipProps): JSX.Element {
  return <MuiTooltip {...props} />;
}
