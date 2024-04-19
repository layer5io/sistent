import { styled } from '@mui/material';

export const ContentCardWrapper = styled('div')(({ theme }) => ({
  padding: '2.5rem',
  margin: '2rem 0',
  backgroundColor: theme.palette.grey['A400'],
  display: 'flex',
  border: `1px solid ${theme.palette.common.black}`,
  justifyContent: 'space-between',
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  '&:hover': {
    transition:
      'background 150ms ease-out 0s, border 150ms ease-out 0s, transform 150ms ease-out 0s',
    transform: 'translate3d(0px, -1px, 0px)',
    boxShadow: `${theme.palette.common.black} 0px 8px 16px 0px`
  },
  '@media screen and (max-width: 992px)': {
    padding: '1.5rem'
  },
  '@media screen and (max-width: 500px)': {
    padding: '0.75rem'
  }
}));

export const ChapterContent = styled('div')({
  display: 'inline-flex'
});

export const ChapterNumber = styled('div')(({ theme }) => ({
  fontSize: '2rem',
  margin: '0 2rem 0 1rem',
  color: theme.palette.grey['800'],
  alignSelf: 'center',
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
}));

export const ChapterDesc = styled('div')(({ theme }) => ({
  h2: {
    margin: '0.25rem 0'
  },
  p: {
    margin: '0.35rem 0',
    color: theme.palette.grey['800'],
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  }
}));
