import { primaryColor } from '@layer5/sistent';
import { styled } from '@mui/material/styles';

const InnerContainerAnimate = styled(InnerContainer)(({ theme }) => ({
  width: '100%',
  top: '0%',
  paddingX: '2rem',
  transform: 'translate(0%, 0%)',
  display: 'flex',
  justifyContent: 'center',
  left: '0%',
  backgroundColor: primaryColor.dark,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    paddingLeft: '1rem',
    overflowX: 'auto',
    padding: '0.4rem',
  },
}));

export default InnerContainerAnimate;
