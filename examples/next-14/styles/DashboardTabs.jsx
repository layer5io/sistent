import { KEPPEL, Tabs } from '@layer5/sistent';
import { styled } from '@mui/material/styles';

export const DashboardTabs = styled(Tabs)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.mode === 'dark' ? KEPPEL : theme.palette.primary.main,
  },
  '& .MuiTab-fullWidth': {
    flexBasis: 'unset',
  },
}));
