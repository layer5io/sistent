import { styled } from '@mui/material';

const SearchAndView = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    margin: 0,
  },
}));

export default SearchAndView;
