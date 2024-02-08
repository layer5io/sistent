import { styled } from '@mui/material';

const InnerContainerAnimate = styled(InnerContainer)(({ theme }) => ({
  width: '100%',
  top: '0%',
  paddingX: '2rem',
  transform: 'translate(0%, 0%)',
  display: 'flex',
  justifyContent: 'center',
  left: '0%',
  backgroundColor: theme.palette.secondary.tabContainer,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    paddingLeft: '1rem',
    overflowX: 'auto',
    padding: '0.4rem',
  },
}));

export default InnerContainerAnimate;
