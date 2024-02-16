import { KEPPEL, Tab } from '@layer5/sistent';
import { styled } from '@mui/material/styles';

export const DashboardTab = styled(Tab)(({ theme }) => ({
  minWidth: 40,
  paddingLeft: 0,
  paddingRight: 0,
  '&.Mui-selected': {
    color: theme.palette.mode === 'dark' ? KEPPEL : theme.palette.primary.main,
  },
}));
