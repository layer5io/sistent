import { type TooltipProps as MuiTooltipProps } from '@mui/material';
import { type FC, type MouseEvent, type ReactNode } from 'react';
import { Tooltip } from '../base/Tooltip';

type TooltipProps = {
  title: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
} & Omit<MuiTooltipProps, 'title' | 'onClick'>;

export const MesheryTooltip: FC<TooltipProps> = ({
  title,
  onClick,
  placement,
  children,
  ...props
}) => {
  return (
    <Tooltip title={title} placement={placement} onClick={onClick} arrow {...props}>
      {children}
    </Tooltip>
  );
};

export { MesheryTooltip as StyledTooltip };
