import { Tooltip, type TooltipProps } from '@mui/material';
import React from 'react';
import { CHARCOAL, WHITE } from '../../theme';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
} & Omit<TooltipProps, 'title' | 'onClick'>;

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize = '1rem',
  ...props
}: CustomTooltipProps): JSX.Element {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            background: CHARCOAL,
            color: WHITE,
            fontSize: { fontSize },
            borderRadius: '0.9375rem',
            padding: '0.9rem'
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
      arrow
      onClick={onClick}
      {...props}
    >
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
