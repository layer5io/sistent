import { styled } from '@mui/material/styles';

const InnerContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export default InnerContainer;
