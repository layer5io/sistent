import { alpha } from '@mui/material';
import type { Components, Theme } from '@mui/material/styles';

export const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  styleOverrides: {
    tooltip: ({ theme }) => {
      const isLight = theme.palette.mode === 'light';
      const shadow = isLight
        ? `0 10px 30px ${alpha('#000', 0.12)}, 0 2px 8px ${alpha('#000', 0.08)}`
        : (() => {
            const green = theme.palette.primary.main;
            return `0 10px 30px ${alpha(green, 0.28)}, 0 2px 8px ${alpha(green, 0.2)}, 0 0 1px ${alpha(green, 0.32)}`;
          })();

      return {
        boxShadow: shadow,
      } as const;
    },
    arrow: ({ theme }) => {
      return {
        color: theme.palette.divider
      } as const;
    }
  }
};
