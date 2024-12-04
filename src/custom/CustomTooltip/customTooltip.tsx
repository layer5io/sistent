import { Tooltip, Typography, styled, type TooltipProps } from '@mui/material';
import React from 'react';
import { SistentThemeProvider, WHITE } from '../../theme';
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

const StyledFontWrapper = styled(Typography)(({ theme }) => ({
  ...theme.typography.textH2Medium,
  fontSize: '1rem',
  lineHeight: '1.5rem'
}));

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize,
  fontWeight = 400,
  variant = 'standard',
  bgColor = '#333333',
  ...props
}: CustomTooltipProps): JSX.Element {
  return (
    <SistentThemeProvider>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: {
              background: bgColor,
              color: WHITE,
              fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
              fontWeight: { fontWeight },
              borderRadius: '0.5rem',
              padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
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
              color: bgColor
            }
          }
        }}
        title={
          typeof title === 'string' ? (
            <StyledFontWrapper>
              <RenderMarkdownTooltip content={title} />
            </StyledFontWrapper>
          ) : (
            title
          )
        }
        placement={placement}
        arrow
        onClick={onClick}
        {...props}
      >
        {children}
      </Tooltip>
    </SistentThemeProvider>
  );
}

export default CustomTooltip;
export type { CustomTooltipProps };
