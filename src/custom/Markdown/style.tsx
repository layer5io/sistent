import { styled } from '@mui/material';
import { text } from '../../theme/colors/colors';

export const StyledMarkdown = styled('a')(({ theme }) => ({
  color: theme.palette.background.brand?.default,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  },
  cursor: 'pointer',
  fontFamily: 'inherit'
}));

// anchor style for notifications markdown content
export const BasicAnchorMarkdown = styled('a')(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  },
  cursor: 'pointer'
}));

export const StyledMarkdownP = styled('p')(({ theme }) => ({
  color: theme.palette.text.default,
  marginBlock: '0px',
  ...theme.typography.textB1Regular,
  fontFamily: 'inherit'
}));

export const StyledMarkdownTooltipP = styled('p')(({ theme }) => ({
  color: theme.palette.text.constant?.white || text.inverse,
  marginBlock: '0px',
  fontFamily: 'inherit'
}));

export const StyledMarkdownH1 = styled('h1')(({ theme }) => ({
  color: theme.palette.text.default,
  fontFamily: 'inherit'
}));

export const StyledMarkdownH2 = styled('h2')(({ theme }) => ({
  color: theme.palette.text.default,
  fontFamily: 'inherit'
}));

export const StyledMarkdownH3 = styled('h3')(({ theme }) => ({
  color: theme.palette.text.default,
  fontFamily: 'inherit'
}));

export const StyledMarkdownH4 = styled('h4')(({ theme }) => ({
  color: theme.palette.text.default,
  fontFamily: 'inherit'
}));

export const StyledMarkdownH5 = styled('h5')(({ theme }) => ({
  color: theme.palette.text.default,
  fontFamily: 'inherit'
}));

export const StyledMarkdownH6 = styled('h6')(({ theme }) => ({
  color: theme.palette.text.default,
  fontFamily: 'inherit'
}));

export const StyledMarkdownBlockquote = styled('blockquote')(({ theme }) => ({
  color: theme.palette.text.default,
  borderLeft: `2px solid ${theme.palette.text.brand}`,
  backgroundColor: theme.palette.background.tertiary
}));

export const StyledMarkdownUl = styled('ul')(({ theme }) => ({
  color: theme.palette.text.default
}));

export const StyledMarkdownLi = styled('li')(({ theme }) => ({
  color: theme.palette.text.default,
  ...theme.typography.textB1Regular,
  fontFamily: 'inherit'
}));

export const StyledMarkdownTh = styled('th')(({ theme }) => ({
  color: theme.palette.text.default,
  ...theme.typography.textH3Medium,
  marginBlock: '0px',
  fontFamily: 'inherit'
}));

export const StyledMarkdownTd = styled('td')(({ theme }) => ({
  color: theme.palette.text.default,
  marginBlock: '0px',
  ...theme.typography.textB1Regular,
  fontFamily: 'inherit'
}));

export const StyledMarkdownPre = styled('pre')(({ theme }) => ({
  background: theme.palette.background.code,
  whiteSpace: 'pre-line',
  fontFamily: 'inherit'
}));
