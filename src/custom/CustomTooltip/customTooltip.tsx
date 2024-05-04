import { Tooltip, type TooltipProps } from '@mui/material';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHARCOAL, KEPPEL, WHITE } from '../../theme';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
} & Omit<TooltipProps, 'title' | 'onClick'>;

export function getHyperLinkDiv(text: string) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: KEPPEL,
              textDecoration: 'underline'
            }}
          >
            {props.children}
          </a>
        )
      }}
    >
      {text}
    </Markdown>
  );
}

function CustomTooltip({
  title,
  onClick = () => { },
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
