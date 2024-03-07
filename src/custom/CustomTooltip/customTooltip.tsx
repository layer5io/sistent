import { Tooltip, type TooltipProps } from '@mui/material';
import React from 'react';
import { CHARCOAL, WHITE } from '../../theme';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
} & Omit<TooltipProps, 'title' | 'onClick'>;

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  ...props
}: CustomTooltipProps): JSX.Element {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            background: CHARCOAL,
            color: WHITE,
            fontSize: '0.75rem',
            borderRadius: '0.9375rem',
            padding: '0.9rem',
            zIndex: '999999'
          }
        },
        popper: {
          sx: {
            opacity: '1'
          }
        }
      }}
      title={title}
      placement={placement}
      onClick={onClick}
      arrow
      {...props}
    >
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
