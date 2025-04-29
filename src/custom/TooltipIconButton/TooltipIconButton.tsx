import React from 'react';
import { IconButton } from '../../base/IconButton';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';
import { IconWrapper } from '../ResponsiveDataTable';

interface TooltipIconProps {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
  arrow?: boolean;
  style?: React.CSSProperties;
  iconType?: string;
  id?: string;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  disabled?: boolean;
  children?: React.ReactNode;
}

export function TooltipIcon({
  children,
  title,
  onClick,
  icon,
  style,
  arrow = true,
  disabled = false,
  iconType,
  id,
  placement
}: TooltipIconProps): JSX.Element {
  const theme = useTheme();

  return (
    <CustomTooltip title={title} arrow={arrow} placement={placement} id={id}>
      <IconWrapper disabled={disabled}>
        <IconButton
          disabled={disabled}
          onClick={onClick}
          sx={{
            '&:hover': {
              '& svg': {
                fill:
                  iconType === 'delete'
                    ? theme.palette.error.main
                    : theme.palette.primary.brand?.default
              }
            },
            ...style
          }}
        >
          {icon || children}
        </IconButton>
      </IconWrapper>
    </CustomTooltip>
  );
}

export default TooltipIcon;
