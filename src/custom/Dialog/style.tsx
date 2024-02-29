import { styled } from '@mui/material';
import {
  BLACK,
  BUTTON_MODAL,
  BUTTON_MODAL_DARK,
  NOT_FOUND,
  SLIGHT_BLACK_2,
  SLIGHT_BLUE,
  WHITE
} from '../../theme/colors/colors';

export const HeaderModal = styled('div')(({ theme }) => {
  const startColor = theme.palette.mode === 'light' ? BUTTON_MODAL : BLACK;
  const endColor = theme.palette.mode === 'light' ? SLIGHT_BLUE : SLIGHT_BLACK_2;

  return {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    boxShadow: 'inset 0px -1px 3px 0px rgba(0,0,0,0.2)',
    background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
    filter:
      theme.palette.mode === 'light'
        ? `progid:DXImageTransform.Microsoft.gradient(startColorstr='${BUTTON_MODAL}',endColorstr='${SLIGHT_BLUE}',GradientType=1)`
        : `progid:DXImageTransform.Microsoft.gradient(startColorstr='${BUTTON_MODAL_DARK}',GradientType=1)`
  };
});

export const ModalWrapper = styled('div')(() => ({
  zIndex: '100',
  borderRadius: '5px'
}));

export const ButtonContainer = styled('div')(({ theme }) => ({
  padding: '1rem 1.5rem',
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.mode === 'light' ? BUTTON_MODAL : BUTTON_MODAL_DARK,
  boxShadow: 'inset 0px 3px 5px 0px rgba(0,0,0,0.25)'
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: '2rem 1rem',
  backgroundColor: theme.palette.mode === 'light' ? WHITE : NOT_FOUND
}));
