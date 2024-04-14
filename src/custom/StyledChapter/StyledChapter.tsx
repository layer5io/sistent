import { styled } from '@mui/material';
import { KEPPEL } from '../../theme';

const StyledChapter = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',

  '.chapter-sub-heading, .chapter-sub-heading a': {
    color: theme.palette.mode === 'light' ? '#3C494F' : '#ffffff66',
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  },

  '.chapter-alt-heading, .chapter-alt-heading a': {
    color: 'gray'
  },

  a: {
    '&:hover': {
      color: KEPPEL
    }
  }
}));
export default StyledChapter;
