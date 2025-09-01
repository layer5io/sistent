import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from '@mui/material';

export interface TooltipProps extends MuiTooltipProps {
  interactive?: boolean;
}

export function Tooltip(props: TooltipProps): JSX.Element {
  return <MuiTooltip {...props} />;
}

export default Tooltip;
