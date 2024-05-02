import { Tooltip, type TooltipProps } from '@mui/material';
import React from 'react';
import { CHARCOAL, KEPPEL, WHITE } from '../../theme';

export type CustomTooltipProps = {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
} & Omit<TooltipProps, 'title' | 'onClick'>;

function getHyperLinkWithDescription(description: string) {
  const markdownLinkRegex = /\[([^\]]+)]\((https?:\/\/[^\s]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let processedDescription = description?.replace(markdownLinkRegex, (match, text, url) => {
    return `<a href="${url}" style="color: ${KEPPEL};" target="_blank" rel="noreferrer">${text}</a>`;
  });

  if (!markdownLinkRegex.test(description)) {
    processedDescription = processedDescription?.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" style="color: ${KEPPEL};" target="_blank" rel="noreferrer">${url}</a>`
    );
  }

  return processedDescription;
}

export function getHyperLinkDiv(text: string) {
  return <div dangerouslySetInnerHTML={{ __html: getHyperLinkWithDescription(text) }} />;
}

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
      title={getHyperLinkDiv(title)}
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
