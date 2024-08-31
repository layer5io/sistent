import { styled } from '@mui/material';

const SetupPreReqWrapper = styled('div')({
  padding: '1rem 0',
  '& h2': {
    margin: '1rem 0'
  },
  '.get-started-desc': {
    margin: '1rem'
  }
});

const ContainerCardWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'row',
  flexWrap: 'wrap',
  '& a': {
    color: theme.palette.text.primary,
    margin: '1rem'
  }
}));

const Card = styled('a')(({ theme }) => ({
  flex: '1',
  padding: '2rem',
  textDecoration: 'none',
  background: theme.palette.mode === 'light' ? '#EEEEEE' : '#212121',
  minHeight: '21.5rem',
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  borderRadius: '10px',
  '&:hover': {
    boxShadow: `${theme.palette.background.brand?.default} 0px 0px 7px`
  },
  '& a': {
    margin: '0 !important',
    '&:hover': {
      color: theme.palette.background.brand?.default
    }
  }
}));

const CardHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
});

const SetupImgs = styled('div')({
  flex: '0 0 25%',
  alignSelf: 'center',
  margin: '0 0.5rem'
});

const Image = styled('img')({
  height: '3rem',
  width: '3rem',
  maxWidth: '3rem',
  margin: 'auto'
});

const SvgIcon = styled('svg')(({ theme }) => ({
  fontSize: '4.15rem',
  alignSelf: 'center',
  flex: '0 0 25%',
  margin: '0 0.5rem',
  filter: theme.palette.mode === 'light' ? '0%' : 'invert(100%)',
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
}));

const CardTitle = styled('h2')({
  fontSize: '1.75rem',
  margin: '1rem 0'
});

const CardText = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
}));

export {
  Card,
  CardHeader,
  CardText,
  CardTitle,
  ContainerCardWrapper,
  Image,
  SetupImgs,
  SetupPreReqWrapper,
  SvgIcon
};
