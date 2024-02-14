import { Components, Theme } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { CARIBBEAN_GREEN, KEPPEL } from '../colors';

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    notchedOutline: {
      borderColor: 'rgba(0, 0, 0, 0.5)'
    },
    root: {
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: CARIBBEAN_GREEN
      },
      [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: CARIBBEAN_GREEN
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: KEPPEL
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: KEPPEL
      }
    }
  }
};
