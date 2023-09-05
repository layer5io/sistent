import { type TooltipProps } from '@mui/material';
import React, { type FC, type MouseEvent, type ReactElement } from 'react';
import { Tooltip } from '../tooltip';

type MesheryTooltipProps = {
  title: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactElement<any, any>;
} & Omit<TooltipProps, 'title' | 'children' | 'onClick'>;

export const MesheryTooltip: FC<MesheryTooltipProps> = (
  { title, onClick, placement, children, ...props }
) => {
  return (
    <Tooltip title={title} placement={placement} onClick={onClick} arrow {...props}>
      {children}
    </Tooltip>
  );
};

export default MesheryTooltip;
