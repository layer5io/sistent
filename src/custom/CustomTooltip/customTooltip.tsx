import { Tooltip, type TooltipProps } from '@mui/material';
import React from 'react';
import { CHARCOAL, WHITE } from '../../theme';
import { RenderMarkdownTooltip } from '../Markdown';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'standard' | 'small';
  bgColor?: string;
} & Omit<TooltipProps, 'title' | 'onClick'>;

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize,
  fontWeight = 400,
  variant = 'standard',
  bgColor = CHARCOAL,
  ...props
}: CustomTooltipProps): JSX.Element {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            background: bgColor,
            color: WHITE,
            fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
            fontWeight: { fontWeight },
            borderRadius: '0.5rem',
            padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem'
          }
        },
        popper: {
          sx: {
            zIndex: 9999999999,
            opacity: '1'
          }
        }
      }}
      title={typeof title === 'string' ? <RenderMarkdownTooltip content={title} /> : title}
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
export type { CustomTooltipProps };
