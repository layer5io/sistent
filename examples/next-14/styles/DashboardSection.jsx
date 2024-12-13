import { styled } from '@mui/material/styles';

const DashboardSection = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#202020' : '#FFFFFF',
  padding: theme.spacing(2),
  borderRadius: 4,
  height: '100%',
}));

export default DashboardSection;
