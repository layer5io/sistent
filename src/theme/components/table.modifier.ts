import { Components, Theme } from '@mui/material/styles';

const MuiTable: Components<Theme>['MuiTable'] = {
  styleOverrides: {
    root: {
      borderCollapse: 'separate',
      borderSpacing: '0'
    }
  }
};

const MuiTableBody: Components<Theme>['MuiTableBody'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return { backgroundColor: theme.palette.background.constant?.table };
    }
  }
};

const MuiTableCell: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        borderBottom: `1px solid ${theme.palette.icon.disabled}`,
        backgroundColor: 'transparent !important'
      };
    },
    head: {
      '& div': {
        fontSize: '1rem',
        fontWeight: 'bold'
      },
      '& .MuiButton-root': {
        fontWeight: 'bold',
        textTransform: 'uppercase !important'
      }
    }
  }
};

const MuiTableFooter: Components<Theme>['MuiTableFooter'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        backgroundColor:
          theme.palette.mode == 'dark'
            ? theme.palette.background.card
            : theme.palette.background.surfaces
      };
    }
  }
};

const MuiTableHead: Components<Theme>['MuiTableHead'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        backgroundColor:
          theme.palette.mode == 'dark'
            ? theme.palette.background.card
            : theme.palette.background.surfaces,
        fontWeight: 'bold',
        textTransform: 'uppercase'
      };
    }
  }
};

const MuiTableRow: Components<Theme>['MuiTableRow'] = {
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        cursor: 'not-allowed'
      }
    }
  }
};

const MuiTableSortLabel: Components<Theme>['MuiTableSortLabel'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        '& .MuiTableSortLabel-icon': {
          color: `${theme.palette.icon.default} !important`,
          height: 'auto !important'
        }
      };
    }
  }
};

const MUIDataTableSelectCell: Components<Theme>['MUIDataTableSelectCell'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent'
    }
  }
};

const MuiToolbar: Components<Theme>['MuiToolbar'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        backgroundColor:
          theme.palette.mode == 'dark'
            ? theme.palette.background.card
            : theme.palette.background.surfaces,
        color: theme.palette.text.default
      };
    }
  }
};

export const MuiTableCombineTheme = {
  MuiTable,
  MuiTableBody,
  MuiTableCell,
  MuiTableFooter,
  MuiTableHead,
  MuiTableRow,
  MuiTableSortLabel,
  MUIDataTableSelectCell,
  MuiToolbar
};
