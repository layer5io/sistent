import { styled } from '@mui/material';

export const StyledMarkdown = styled('a')(({ theme }) => ({
  color: theme.palette.text.brand,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));
