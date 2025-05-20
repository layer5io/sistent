import { styled } from '../../theme';

export const CarouselButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: '1',
  background: theme.palette.background.paper,
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '50%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    background: theme.palette.primary.main,
    color: '#fff'
  },
  '&:first-of-type': {
    left: '-1.2rem'
  },
  '&:last-of-type': {
    right: '-1.2rem'
  }
}));

export const CarouselWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative'
});

export const CarouselContainer = styled('div')({
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
  gap: '1rem',
  padding: '1rem 0',
  width: '100%',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '.carousel-item': {
    flex: '0 0 auto',
    scrollSnapAlign: 'center',
    width: 'auto'
  }
});
