import { styled } from '@mui/system';

export const CarouselContainer = styled('div')(() => ({
  position: 'relative',
  overflow: 'hidden'
}));

export const CarouselTrack = styled('ul')<{ transform: string }>(({ transform }) => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  transition: 'transform 0.3s ease-in-out',
  transform: `translateX(${transform})`,
  margin: '0 -8px',

  ['@media (min-width: 1280px)']: {
    margin: '0 -16px'
  }
}));

export const CarouselItem = styled('li')<{ width: string }>(({ width }) => ({
  display: 'inline-block',
  padding: '0 8px',
  width: width,

  ['@media (min-width: 1280px)']: {
    padding: '0 16px'
  }
}));

export const ArrowButton = styled('button')(() => ({
  position: 'absolute',
  top: '33%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  width: '36px',
  height: '36px',

  ['@media (min-width: 1280px)']: {
    width: '48px',
    height: '48px'
  }
}));

export const LeftButton = styled(ArrowButton)(() => ({
  left: '-12px',

  ['@media (min-width: 1280px)']: {
    left: '-24px'
  }
}));

export const RightButton = styled(ArrowButton)(() => ({
  right: '-12px',

  ['@media (min-width: 1280px)']: {
    right: '-24px'
  }
}));
