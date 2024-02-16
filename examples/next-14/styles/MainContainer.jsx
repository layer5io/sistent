import { styled } from '@mui/material/styles';

export const darkCharcoal = "#464646"

const MainContainer = styled('div')(({ theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark'
      ? darkCharcoal
      : theme.palette.common.white,
  height: '25rem',
  display: 'flex',
  position: 'relative',
  marginTop: '1rem',
  [theme.breakpoints.down('sm')]: {
    height: '47rem',
  },
}));

export default MainContainer;
