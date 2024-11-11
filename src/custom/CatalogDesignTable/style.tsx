import { styled } from '@mui/material';

export const NameDiv = styled('div')({
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline'
  }
});
