import _ from 'lodash';
import React from 'react';
import { useTheme } from '@mui/material/styles';
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
  textColor?: string;
  useThemeColors?: boolean;
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
  textColor = WHITE,
  useThemeColors = false,
  componentsProps = {},
  ...props
}: CustomTooltipProps): JSX.Element {
  const theme = useTheme();
  
  const tooltipBgColor = useThemeColors 
    ? theme.palette.background.paper
    : bgColor;
    
  const tooltipTextColor = useThemeColors
    ? theme.palette.text.primary
    : textColor;
  return (
    <Tooltip
      enterTouchDelay={0}
      leaveTouchDelay={2000}
      componentsProps={_.merge(
        {
          tooltip: {
            sx: {
              background: tooltipBgColor,
              color: tooltipTextColor,
              maxWidth: '600px',
              fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
              fontWeight: { fontWeight },
              borderRadius: '0.5rem',
              padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
              boxShadow: useThemeColors
                ? theme.shadows[4]
                : 'rgba(0, 0, 0, 0.6) 0px 4px 10px, rgba(0, 0, 0, 0.5) 0px 2px 4px'
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
              color: tooltipBgColor
            }
          }
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
