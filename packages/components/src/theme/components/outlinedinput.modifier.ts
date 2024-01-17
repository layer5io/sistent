import { Components, Theme } from '@mui/material';
import { defaultPalette } from '../colors';

export const SistentOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      '&:hover $notchedOutline': {
        borderColor: defaultPalette.keppel[3]
      },
      '&$focused $notchedOutline': {
        borderColor: defaultPalette.keppel[3]
      }
    }
  }
};
