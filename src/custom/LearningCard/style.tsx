import { styled } from '@mui/material/styles';
import { BLACK, ONYX_BLACK, SILVER_GRAY, WHITE } from '../../theme';

const CardWrapper = styled('div')({
  width: '28rem',
  height: '16rem',
  margin: 'auto',
  borderRadius: '1rem'
});

const CardActive = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
  '&:hover': {
    boxShadow: `${theme.palette.background.brand?.default} 0px 0px 19px 6px`
  },
  backgroundColor: theme.palette.mode === 'light' ? WHITE : BLACK
}));

const CardLink = styled('a')({
  color: 'black',
  textDecoration: 'none'
});

const CardParent = styled('div')(({ theme }) => ({
  borderTop: `5px solid ${theme.palette.background.brand?.default}`,
  borderRadius: '0.25rem',
  minHeight: '16rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0px 0.75rem 1rem 0.25rem rgba(0, 0, 0, 0.12)',
  position: 'relative',
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
}));

const Card2 = styled('div')(({ theme }) => ({
  background: theme.palette.mode === 'light' ? SILVER_GRAY : ONYX_BLACK,
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
}));

const CardHead = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  '& span': {
    border: `1px solid ${theme.palette.primary.dark}`,
    color: theme.palette.text.primary,
    borderRadius: '0.8rem',
    padding: '0.05rem 0.75rem',
    fontSize: '1rem',
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  },
  '& h3': {
    color: theme.palette.text.primary,
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  }
}));

const CardDesc = styled('div')(({ theme }) => ({
  padding: '0 1rem',
  '.summary': {
    color: theme.palette.grey['700'],
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  },
  p: {
    fontSize: '1rem'
  }
}));

const CardSubdata = styled('div')(({ theme }) => ({
  padding: '0 1rem',
  position: 'absolute',
  bottom: '0rem',
  p: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 600,
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  }
}));

const CardImage = styled('div')({
  textAlign: 'center',
  position: 'absolute',
  bottom: '0.1rem',
  right: '0.75rem',
  opacity: 0.2,
  img: {
    height: '8.5rem',
    width: '8.5rem'
  }
});

export {
  Card2,
  CardActive,
  CardDesc,
  CardHead,
  CardImage,
  CardLink,
  CardParent,
  CardSubdata,
  CardWrapper
};
