import { styled } from '@mui/material';
import { KEPPEL, SLATE_BLUE, TRANSPARENT_WHITE } from '../../theme';

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
    color: KEPPEL
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
