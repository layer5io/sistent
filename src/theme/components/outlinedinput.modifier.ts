import { Components, Theme } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    notchedOutline: {
      borderColor: 'rgba(0, 0, 0, 0.5)'
    },
    root: ({ theme }) => {
      const {
        palette: {
          background: { graphics, brand },
          border: { strong }
        },
        typography: { textB1Regular }
      } = theme;
      return {
        ...textB1Regular,
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: graphics?.default
        },
        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: graphics?.default
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: brand?.default
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: brand?.default
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: strong
        }
      };
    }
  }
};
