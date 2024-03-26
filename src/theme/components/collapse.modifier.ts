import { Components, Theme } from '@mui/material';

declare module '@mui/material/Collapse' {
  interface CollapseProps {
    variant?: 'submenu';
  }
  interface CollapsePropsVariantOverrides {
    submenu: true;
  }
}

export const MuiCollapse: Components<Theme>['MuiCollapse'] = {
  styleOverrides: {
    root: {}
  },
  variants: [
    {
      props: { variant: 'submenu' },
      style: ({ theme }) => {
        const {
          palette: {
            background: { hover, secondary }
          }
        } = theme;
        return {
          backgroundColor: hover,
          '&:active': {
            backgroundColor: secondary
          }
        };
      }
    }
  ]
};
