import { type TooltipProps as MuiTooltipProps } from '@mui/material';
import React, { type FC, type MouseEvent, type ReactElement } from 'react';
import { Tooltip } from '../base/Tooltip';

type TooltipProps = {
  title: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactElement<any, any>;
} & Omit<MuiTooltipProps, 'title' | 'children' | 'onClick'>;

export const MesheryTooltip: FC<TooltipProps> = (
  { title, onClick, placement, children, ...props }
) => {
  return (
    <Tooltip title={title} placement={placement} onClick={onClick} arrow {...props}>
      {children}
    </Tooltip>
  );
};

export default Tooltip;
