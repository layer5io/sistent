import { type TooltipProps } from '@mui/material';
import React from 'react';
import { Tooltip } from '../../base/Tooltip';

type CustomTooltipProps = {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
} & Omit<TooltipProps, 'title' | 'onClick'>;

function StyledTooltip({
  title,
  onClick,
  placement,
  children,
  ...props
}: CustomTooltipProps): JSX.Element {
  return (
    <Tooltip title={title} placement={placement} onClick={onClick} arrow {...props}>
      {children}
    </Tooltip>
  );
}

export default StyledTooltip;
