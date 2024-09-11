import { styled } from '@mui/material';
import { DialogContentText, FormControl, ListItemText, Select, Typography } from '../../base';

export const CustomText = styled(Typography)(() => ({
  fontFamily: 'Qanelas Soft, sans-serif',
  '&.MuiTypography-root': {
    fontFamily: 'Qanelas Soft, sans-serif'
  }
}));

export const CustomListItemText = styled(ListItemText)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const IconButtonWrapper = styled(`div`)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '0.2rem'
}));

export const VisibilityIconWrapper = styled(`div`)(({ theme }) => ({
  width: '36px',
  height: '36px',
  background: theme.palette.background.hover,
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '1rem'
}));

export const FormControlWrapper = styled(FormControl)(() => ({
  width: '100%'
}));

export const ListWrapper = styled(`div`)(() => ({
  maxHeight: '16rem',
  overflowY: 'auto'
}));

export const CustomSelect = styled(Select)(() => ({
  width: '6rem',
  boxShadow: 'none',
  '&:before': {
    display: 'none'
  },
  '&:after': {
    display: 'none'
  },
  fontFamily: 'Qanelas Soft, sans-serif',
  '&.MuiTypography-root': {
    fontFamily: 'Qanelas Soft, sans-serif'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiSelect-select': {
    padding: 0
  }
}));

export const CustomDialogContentText = styled(DialogContentText)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '0.2rem',
  alignItems: 'center',
  alignContent: 'center'
}));
