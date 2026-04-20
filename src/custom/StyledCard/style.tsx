import { styled } from '@mui/material';
import { Link, ListItem } from '../../base';

export const backgroundImg = styled('div')<{ backgroundImage?: string }>(({ backgroundImage }) => ({
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundPosition: 'right bottom',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}));

export const CustomCode = styled('code')(() => ({
  backgroundColor: '#212121',
  color: '#fff',
  padding: '0.2rem 0.4rem',
  borderRadius: '0.2rem'
}));

export const List = styled(ListItem)<{ iconSrc?: string }>(({ iconSrc }) => ({
  listStyleImage: iconSrc ? `url(${iconSrc})` : 'none',
  display: 'flex',
  alignItems: 'flex-start'
}));

export const CustomLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:visited': {
    textDecoration: 'none'
  },
  '&:hover': {
    textDecoration: 'underline'
  },
  fontWeight: 'bold'
}));

export const MUILink = styled(Link)(() => ({
  color: '#455a64',
  textDecoration: 'none',
  '&:visited': {
    textDecoration: 'none'
  },
  '&:hover': {
    textDecoration: 'none',
    cursor: 'pointer'
  },
  fontWeight: '600'
}));

export const CustomLinkDiv = styled('div')(() => ({
  display: 'block',
  width: '10rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

export const CustomDisabledLink = styled('a')(() => ({
  textDecoration: 'none',
  color: '#455a64',
  '&:visited': {
    textDecoration: 'none'
  },
  opacity: '0.5',
  cursor: 'not-allowed'
}));
