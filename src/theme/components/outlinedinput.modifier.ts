import { Components, Theme } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// MUI InputBase's own line-height; matches the fixed height of the TextField <input>.
const FIELD_LINE_HEIGHT = '1.4375em';

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
        // textB1Regular's 1.75rem body line-height must not reach the field: the
        // Select display div sizes its height from the inherited line-height,
        // while the TextField <input> has a fixed 1.4375em height, so keeping the
        // body value made outlined Selects 5px taller than TextFields (61px vs 56px).
        // Restore MUI's InputBase line-height for both the root and the sm breakpoint.
        lineHeight: FIELD_LINE_HEIGHT,
        [theme.breakpoints.down('sm')]: {
          ...(textB1Regular[theme.breakpoints.down('sm')] as object),
          lineHeight: FIELD_LINE_HEIGHT
        },
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
