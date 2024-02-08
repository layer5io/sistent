import { styled } from '@mui/material';

const MainContainer = styled('div')(({ theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark'
      ? theme.palette.secondary.toolbarBg2
      : theme.palette.secondary.toolbarBg1,
  height: '25rem',
  display: 'flex',
  position: 'relative',
  marginTop: '1rem',
  [theme.breakpoints.down('sm')]: {
    height: '47rem',
  },
}));

export default MainContainer;
