import _ from 'lodash';
import React from 'react';
import type { Theme } from '@mui/material/styles';
import { alpha, useTheme } from '@mui/material';
import { Tooltip, TooltipProps } from '../../base';
import { WHITE } from '../../theme';
import { RenderMarkdownTooltip } from '../Markdown';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'standard' | 'small';
  bgColor?: string;
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
  bgColor = '#141414',
  componentsProps = {},
  ...props
}: CustomTooltipProps): JSX.Element {
  const theme = useTheme();

  return (
    <Tooltip
      enterDelay={150}
      enterNextDelay={400}
      leaveDelay={700}
      componentsProps={_.merge(
        {
          tooltip: {
            sx: {
              background: bgColor,
              color: WHITE,
              maxWidth: '600px',
              fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
              fontWeight,
              borderRadius: '0.5rem',
              padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
              boxShadow: (themeArg?: Theme) => {
                const t = themeArg || theme;
                const isDefaultTheme = t.palette.primary.main === '#1976d2';
                console.log(isDefaultTheme)

                if (t?.palette?.mode === 'light' && !isDefaultTheme) {
                  return 'rgba(0, 0, 0, 0.6) 0px 4px 10px, rgba(0, 0, 0, 0.5) 0px 2px 4px';
                }

                const green = '#00B39F';
                return `0 10px 30px ${alpha(green, 0.28)}, 
                        0 2px 8px ${alpha(green, 0.2)}, 
                        0 0 1px ${alpha(green, 0.32)}`;
              },
            },
          },
          popper: {
            sx: {
              zIndex: 9999999999,
              opacity: '1',
            },
          },
          arrow: {
            sx: {
              color: bgColor,
            },
          },
        },
        componentsProps
      )}
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
