import React from 'react';
import { Tooltip, TooltipProps } from '../../base';
import { useTheme } from '../../theme';
import { RenderMarkdownTooltip } from '../Markdown';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'standard' | 'small';
  componentsProps?: TooltipProps['componentsProps'];
} & Omit<TooltipProps, 'title' | 'onClick'>;

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize,
  fontWeight = 400,
  variant = 'standard',
  componentsProps = {},
  ...props
}: CustomTooltipProps): JSX.Element {
  const theme = useTheme();

  return (
    <Tooltip
      enterTouchDelay={0}
      leaveTouchDelay={2000}
      componentsProps={{
        tooltip: {
          sx: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            maxWidth: '600px',
            fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
            fontWeight: { fontWeight },
            borderRadius: '0.5rem',
            padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
            boxShadow: theme.shadows[4]
          }
        },
        popper: {
          sx: {
            zIndex: 9999999999,
            opacity: '1'
          }
        },
        arrow: {
          sx: {
            color: theme.palette.background.paper
          }
        },
        ...componentsProps
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
