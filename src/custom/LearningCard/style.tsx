import { styled } from '@mui/material/styles';
import { BLACK, ONYX_BLACK, SILVER_GRAY, WHITE } from '../../theme';

const CardWrapper = styled('div')({
  width: '100%',
  maxWidth: '28rem',
  minWidth: '10rem',
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

const OwnLearningCard = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: `${theme.palette.background.brand?.default} 0px 0px 19px 6px`
  },
  background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.85) 0%, 
        rgba(248, 250, 252, 0.9) 50%, 
        rgba(241, 245, 249, 0.85) 100%)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 15px,
          rgba(148, 163, 184, 0.1) 15px,
          rgba(148, 163, 184, 0.1) 30px
        )`,
    pointerEvents: 'none'
  }
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
  justifyContent: 'space-between',
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
  display: 'flex',
  gap: '0.4rem',
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
  CardWrapper,
  OwnLearningCard
};
