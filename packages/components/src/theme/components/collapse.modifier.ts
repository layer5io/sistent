import { Components, Theme } from '@mui/material';
import { patternsBlue } from '../colors';

declare module '@mui/material/Collapse' {
  interface CollapseProps {
    variant?: 'submenu';
  }
  interface CollapsePropsVariantOverrides {
    submenu: true;
  }
}

export const SistentCollapse: Components<Theme>['MuiCollapse'] = {
  styleOverrides: {
    root: {}
  },
  variants: [
    {
      props: { variant: 'submenu' },
      style: ({ theme }) => {
        const {
          palette: { cultured }
        } = theme;
        return {
          backgroundColor: cultured.main,
          '&:active': {
            backgroundColor: patternsBlue.main
          }
        };
      }
    }
  ]
};
