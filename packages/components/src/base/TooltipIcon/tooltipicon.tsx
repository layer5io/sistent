import { IconButton, IconButtonProps, Tooltip as MuiTooltip } from '@mui/material';
import React, { ReactNode } from 'react';

interface TooltipIconProps {
  icon: ReactNode;
  tooltipTitle: string;
  iconButtonProps?: IconButtonProps;
}

export const TooltipIcon: React.FC<TooltipIconProps> = ({
  icon,
  tooltipTitle,
  iconButtonProps = {}
}: TooltipIconProps) => {
  return (
    <MuiTooltip title={tooltipTitle} arrow>
      <IconButton {...iconButtonProps}>{icon}</IconButton>
    </MuiTooltip>
  );
};
