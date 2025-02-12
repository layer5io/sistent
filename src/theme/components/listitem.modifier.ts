import { Components, ListItemProps, Theme } from '@mui/material';

declare module '@mui/material/ListItem' {
  interface ListItemPropsVariantOverrides {
    menu: true;
    submenu: true;
  }
}

export const MuiListItem: Components<Theme>['MuiListItem'] = {
  styleOverrides: {
    root: {}
  },
  variants: [
    {
      props: { variant: 'menu' } as ListItemProps,
      style: ({ theme }) => {
        const {
          palette: {
            text: { default: defaultText },
            icon: { default: defaultIcon },
            background: { brand }
          }
        } = theme;
        return {
          textTransform: 'none',
          margin: '.5rem 0rem .5rem .5rem',
          padding: '0rem',
          color: defaultText,
          fontSize: '.9rem',
          fill: defaultText,
          '&.Mui-selected': {
            fontWeight: 'bold',
            color: defaultText,
            fill: defaultText,
            '&:hover': {
              color: defaultText,
              '& svg': {
                fill: defaultIcon
              }
            }
          },
          '&:has(> .MuiListItem-root.MuiMenuItem-root)': {
            backgroundColor: brand?.default
          },
          '& svg': {
            marginRight: '.75rem',
            paddingLeft: '0rem',
            marginLeft: '0rem'
          }
        };
      }
    },
    {
      props: { variant: 'submenu' } as ListItemProps,
      style: ({ theme }) => {
        const {
          palette: {
            text: { default: defaultText },
            icon: { default: defaultIcon },
            background: { secondary }
          }
        } = theme;
        return {
          textTransform: 'none',
          margin: '.0rem 0rem 0rem .5rem',
          justifyContent: 'center',
          alignItems: 'center',
          color: defaultText,
          fontSize: '.9rem',
          fill: defaultText,
          '&.Mui-selected': {
            fontWeight: 'bold',
            backgroundColor: secondary,
            color: defaultText,
            fill: defaultText,
            '&:hover': {
              color: defaultText,
              '& svg': {
                fill: defaultIcon
              }
            }
          },
          '& svg': {
            marginRight: '.5rem'
          }
        };
      }
    }
  ]
};
