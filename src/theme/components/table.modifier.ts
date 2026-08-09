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
        backgroundColor: 'transparent'
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
    root: ({ theme }) => ({
      backgroundColor: theme.palette.background.constant?.table || theme.palette.background.paper,
      '.MuiTableRow-root:hover &': {
        backgroundImage: `linear-gradient(${theme.palette.action.hover}, ${theme.palette.action.hover})`
      },
      '&.MuiTableCell-head': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.background.card
            : theme.palette.background.surfaces || theme.palette.background.paper
      }
    })
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
