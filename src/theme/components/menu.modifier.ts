import { Components, Theme } from '@mui/material';

export const MuiMenu: Components<Theme>['MuiMenu'] = {
  defaultProps: {
    disableScrollLock: true,

    slotProps: {
      transition: {
        onEnter: () => {
          document.documentElement.style.overflow = "hidden";
        },
        onExited: () => {
          document.documentElement.style.overflow = "";
        }
      }
    }
  },
  styleOverrides: {
    paper: {
      '& .MuiMenuItem-root.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
      }
    }
  }
};
