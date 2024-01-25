import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

export interface ChildrenPropType<T> {
  children?: T;
}

/**
 * Create a custom Tooltip component to resolve the React.forwardRef warning
 */
export const Tooltip = React.forwardRef<
  HTMLDivElement,
  TooltipProps & ChildrenPropType<React.ReactNode>
>(
  (props, ref): JSX.Element => (
    <MuiTooltip {...props} ref={ref}>
      <span>{props.children}</span>
    </MuiTooltip>
  )
);

export default Tooltip;
