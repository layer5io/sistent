import { Tooltip, type TooltipProps } from '@mui/material';
import React from 'react';
import { CHARCOAL, WHITE } from '../../theme';
import RenderMarkdown from '../Markdown';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
} & Omit<TooltipProps, 'title' | 'onClick'>;

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize = '1rem',
  fontWeight = 400,
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
            fontWeight: { fontWeight },
            borderRadius: '0.5rem',
            padding: '1rem'
          }
        },
        popper: {
          sx: {
            opacity: '1'
          }
        }
      }}
      title={<RenderMarkdown content={typeof title === 'string' ? title : ''} />}
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
