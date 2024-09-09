import { styled } from '@mui/material';
import { ALABASTER_WHITE, MIDNIGHT_BLACK } from '../../theme';

// Styled component for ChapterCardWrapper
export const ChapterCardWrapper = styled('div')(({ theme }) => ({
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  padding: '1rem 1.25rem',
  width: '64rem',
  backgroundColor: theme.palette.mode === 'light' ? ALABASTER_WHITE : MIDNIGHT_BLACK,
  display: 'flex',
  border: `1px solid ${
    theme.palette.mode === 'light' ? 'rgb(0 0 0 / 0.01)' : 'rgb(255 255 255 / 0.03)'
  }`,
  justifyContent: 'space-between',
  '&:hover': {
    border: `1px solid ${theme.palette.background.brand?.default}`,
    transition:
      'background 150ms ease-out 0s, border 150ms ease-out 0s, transform 150ms ease-out 0s',
    transform: 'translate3d(0px, -3px, 0px)',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 3px 10px 0px'
  }
}));

// Functional component for ChapterContent
export const ChapterContent = styled('div')({
  display: 'inline-flex'
});

// Functional component for ChapterNumber
export const ChapterNumber = styled('div')(({ theme }) => ({
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  fontSize: '2rem',
  margin: '0 2rem 0 1rem',
  color: theme.palette.mode === 'light' ? 'rgb(0 0 0 / 0.6)' : 'rgb(255 255 255 / 0.6)',
  alignSelf: 'center'
}));
export const ChapterDescription = styled('div')({
  h3: {
    margin: '0.25rem 0'
  },
  p: {
    margin: '0.35rem 0',
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    color: 'inherit'
  },
  '@media screen and (max-width: 650px)': {
    p: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '75vw'
    }
  },
  '@media screen and (max-width: 650px) and (min-width: 300px)': {
    p: {
      width: '68vw'
    }
  }
});
