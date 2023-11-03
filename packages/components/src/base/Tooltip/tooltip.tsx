import { Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';

export function Tooltip(props: TooltipProps): JSX.Element {
  return <MuiTooltip {...props} />;
}
