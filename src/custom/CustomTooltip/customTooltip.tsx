import { alpha, getContrastRatio, ThemeProvider, useTheme } from '@mui/material';
import type { PaletteMode, Theme } from '@mui/material/styles';
import _ from 'lodash';
import React from 'react';
import { Tooltip, TooltipProps } from '../../base';
import { createCustomTheme, WHITE } from '../../theme';
import { RenderMarkdownTooltip } from '../Markdown';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'standard' | 'small';
  bgColor?: string;
  slotProps?: TooltipProps['slotProps'];
} & Omit<TooltipProps, 'title' | 'onClick'>;

/**
 * The palette mode a surface of colour `bg` calls for: `dark` when white text
 * reads better on it than black. An unparseable value (a CSS variable, say)
 * is treated as dark, the component's default surface.
 */
const surfaceMode = (bg: string): PaletteMode => {
  try {
    return getContrastRatio(bg, '#fff') >= getContrastRatio(bg, '#000') ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
};

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize,
  fontWeight = 400,
  variant = 'standard',
  bgColor = '#141414',
  slotProps = {},
  ...props
}: CustomTooltipProps): JSX.Element {
  const theme = useTheme();
  const mode = surfaceMode(bgColor);
  // The surface is painted from `bgColor`, not from the ambient palette, so
  // content must resolve `palette.*` against the surface it sits on. When the
  // page already matches, keep its (possibly branded) theme untouched.
  const surfaceTheme = React.useMemo(
    () => (theme.palette.mode === mode ? null : createCustomTheme(mode)),
    [theme.palette.mode, mode]
  );
  const content = typeof title === 'string' ? <RenderMarkdownTooltip content={title} /> : title;

  return (
    <Tooltip
      slotProps={_.merge(
        {
          tooltip: {
            sx: {
              background: bgColor,
              color: mode === 'dark' ? WHITE : (surfaceTheme ?? theme).palette.text.primary,
              maxWidth: '600px',
              fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
              fontWeight,
              borderRadius: '0.5rem',
              padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
              boxShadow: (themeArg?: Theme) => {
                const t = themeArg || theme;
                const isDefaultTheme = t.palette.primary.main === '#1976d2';

                if (t?.palette?.mode === 'light' && !isDefaultTheme) {
                  return 'rgba(0, 0, 0, 0.6) 0px 4px 10px, rgba(0, 0, 0, 0.5) 0px 2px 4px';
                }

                const green = '#00B39F';
                return `0 10px 30px ${alpha(green, 0.28)}, 
                        0 2px 8px ${alpha(green, 0.2)}, 
                        0 0 1px ${alpha(green, 0.32)}`;
              }
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
        },
        slotProps
      )}
      title={surfaceTheme ? <ThemeProvider theme={surfaceTheme}>{content}</ThemeProvider> : content}
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
