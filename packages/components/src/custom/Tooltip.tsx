import { type TooltipProps as MuiTooltipProps } from '@mui/material';
import React from 'react';
import { Tooltip } from '../base/Tooltip';

type TooltipProps = {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
} & Omit<MuiTooltipProps, 'title' | 'onClick'>;

function MesheryTooltip({
  title,
  onClick,
  placement,
  children,
  ...props
}: TooltipProps): JSX.Element {
  return (
    <Tooltip title={title} placement={placement} onClick={onClick} arrow {...props}>
      {children}
    </Tooltip>
  );
}

export { MesheryTooltip as StyledTooltip };
