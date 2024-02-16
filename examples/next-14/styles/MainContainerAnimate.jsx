import { styled } from '@mui/material/styles';

const MainContainerAnimate = styled(MainContainer)(({ theme }) => ({
  height: '36rem',
  [theme.breakpoints.down('sm')]: {
    height: '73rem',
  },
}));

export default MainContainerAnimate;
