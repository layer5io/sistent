import { SxProps } from '@mui/material/styles';
import React from 'react';
import { IconButton } from '../base/IconButton';
import { CustomTooltip } from './CustomTooltip';

interface TooltipIconProps {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  icon: React.ReactNode;
  arrow?: boolean;
  style?: React.CSSProperties;
}

export function TooltipIcon({
  title,
  onClick,
  icon,
  style,
  arrow = false
}: TooltipIconProps): JSX.Element {
  return (
    <CustomTooltip title={title} arrow={arrow}>
      <IconButton
        onClick={onClick}
        sx={{
          '&:hover': {
            '& svg': {
              fill: '#00d3a9'
            },
            borderRadius: '4px'
          },
          ...(style as SxProps)
        }}
        disableRipple
      >
        {icon}
      </IconButton>
    </CustomTooltip>
  );
}

export default TooltipIcon;
