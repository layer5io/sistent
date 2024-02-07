import { Components, ListItemProps, Theme } from '@mui/material';
import { DARK_SLATE_GRAY, PATTERNS_BLUE } from '../colors';

export const MuiListItem: Components<Theme>['MuiListItem'] = {
  variants: [
    {
      props: { variant: 'menu' } as ListItemProps,
      style: {
        textTransform: 'none',
        margin: '.5rem 0rem .5rem .5rem',
        padding: '0rem',
        color: DARK_SLATE_GRAY,
        fontSize: '.9rem',
        fill: DARK_SLATE_GRAY,
        '&.Mui-selected': {
          fontWeight: 'bold',
          color: DARK_SLATE_GRAY,
          fill: DARK_SLATE_GRAY,
          '&:hover': {
            color: DARK_SLATE_GRAY,
            '& svg': {
              fill: DARK_SLATE_GRAY
            }
          }
        },
        '&:li:has(> .MuiMenuItem)': {
          backgroundColor: 'green'
        },
        '& svg': {
          marginRight: '.75rem',
          paddingLeft: '0rem',
          marginLeft: '0rem'
        }
      }
    },
    {
      props: { variant: 'submenu' } as ListItemProps,
      style: {
        textTransform: 'none',
        margin: '.0rem 0rem 0rem .5rem',
        justifyContent: 'center',
        alignItems: 'center',
        color: DARK_SLATE_GRAY,
        fontSize: '.9rem',
        fill: DARK_SLATE_GRAY,
        '&.Mui-selected': {
          fontWeight: 'bold',
          backgroundColor: PATTERNS_BLUE,
          color: DARK_SLATE_GRAY,
          fill: DARK_SLATE_GRAY,
          '&:hover': {
            color: DARK_SLATE_GRAY,
            '& svg': {
              fill: DARK_SLATE_GRAY
            }
          }
        },
        '& svg': {
          marginRight: '.5rem'
        }
      }
    }
  ]
};
