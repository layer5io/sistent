import { styled } from '@mui/material';
import { SLATE_BLUE, TRANSPARENT_WHITE } from '../../theme';

const StyledChapter = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',

  '.chapter-sub-heading, .chapter-sub-heading a': {
    color: theme.palette.mode === 'light' ? SLATE_BLUE : TRANSPARENT_WHITE,
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  },

  '.chapter-alt-heading, .chapter-alt-heading a': {
    color: 'gray'
  },

  '& a': {
    color: theme.palette.background.brand?.default,
    textDecoration: 'none'
  },
  '& p > code': {
    color: 'inherit',
    padding: '.2em .4em',
    margin: '0',
    fontSize: '85%',
    wordBreak: 'normal',
    backgroundColor: theme.palette.background.code,
    borderRadius: '.25rem'
  },
  '& pre': {
    backgroundColor: '#011627',
    padding: '1em',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    color: '#d6deeb',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    margin: '1rem auto autocompleteClasses',
    fontFamily: 'Courier New, Courier, monospace'
  }
}));
export default StyledChapter;
