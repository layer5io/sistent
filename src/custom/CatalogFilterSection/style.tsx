import { styled } from '@mui/material/styles';
import { Box, Button, ListItemButton } from '../../base';
import { StyleProps } from './CatalogFilterSidebar';

export const FiltersCardDiv = styled(Box)<{ styleProps: StyleProps }>(({ styleProps }) => ({
  padding: '1rem',
  borderRadius: '1rem',
  width: '100%',
  gap: '0.5rem',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  backgroundColor: styleProps.backgroundColor,
  ['@media (max-width:900px)']: {
    display: 'none'
  }
}));

export const FilterDrawerDiv = styled('div')(() => ({
  display: 'none',
  ['@media (max-width:899px)']: {
    display: 'block'
  }
}));

export const LabelDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}));

export const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.brand?.default,
  '&:hover': {
    backgroundColor: theme.palette.background.default
  },
  height: '3.5rem',
  ['@media (max-width:450px)']: {
    minWidth: '0px'
  }
}));

export const FiltersDrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  backgroundColor: theme.palette.border.strong,
  height: '10vh',
  boxShadow: '0px 4px 4px rgba(0, 179, 159, 0.4)',
  marginBottom: '0.625rem'
}));

export const CheckBoxButton = styled(ListItemButton)(({ theme }) => ({
  padding: '0.25rem 2rem',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.disabled
}));

export const FilterTitleButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.surfaces,
  borderRadius: '0.5rem',
  marginTop: 2,
  display: 'flex',
  justifyContent: 'space-between'
}));

export const EndAdornmentText = styled('p')(({ theme }) => ({
  color: theme.palette.text.tertiary
}));

export const FilterText = styled('span')(() => ({
  marginLeft: '0.5rem',
  display: 'block',
  '@media (max-width: 853px)': {
    display: 'none'
  }
}));
