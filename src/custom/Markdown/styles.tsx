import { styled } from '@mui/material';

export const StyledMarkdown = styled('div')(({ theme }) => ({
  a: {
    color: theme.palette.text.brand,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
