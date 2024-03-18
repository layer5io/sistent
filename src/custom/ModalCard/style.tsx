import { styled } from '@mui/material';
import { Typography } from '../../base';
import {
  BLACK,
  BUTTON_MODAL,
  BUTTON_MODAL_DARK,
  SLIGHT_BLACK_2,
  SLIGHT_BLUE
} from '../../theme/colors/colors';

export const ContentContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default
}));

export const ModalWrapper = styled('div')(() => ({
  zIndex: '100',
  borderRadius: '5px'
}));

export const ButtonContainer = styled('div')(({ theme }) => {
  const startColor = theme.palette.mode === 'light' ? BUTTON_MODAL : BLACK;
  const endColor = theme.palette.mode === 'light' ? SLIGHT_BLUE : SLIGHT_BLACK_2;

  return {
    padding: '1.25rem 1rem',
    display: 'flex',
    justifyContent: 'flex-end',

    background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
    boxShadow: 'inset 0px 3px 5px 0px rgba(0,0,0,0.25)',
    position: 'relative',
    zIndex: '100'
  };
});
export const HeaderTypography = styled(Typography)({
  fontSize: '18px'
});
export const HeaderModal = styled('div')(({ theme }) => {
  const startColor = theme.palette.mode === 'light' ? BUTTON_MODAL : BLACK;
  const endColor = theme.palette.mode === 'light' ? SLIGHT_BLUE : SLIGHT_BLACK_2;

  return {
    display: 'flex',
    borderRadius: '5px  5px 0px 0px',
    justifyContent: 'space-between',
    padding: '11px 16px',
    height: '52px',
    fill: theme.palette.icon.inverse,
    boxShadow: 'inset 0px -1px 3px 0px rgba(0,0,0,0.2)',
    background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
    filter:
      theme.palette.mode === 'light'
        ? `progid:DXImageTransform.Microsoft.gradient(startColorstr='${BUTTON_MODAL}',endColorstr='${SLIGHT_BLUE}',GradientType=1)`
        : `progid:DXImageTransform.Microsoft.gradient(startColorstr='${BUTTON_MODAL_DARK}',GradientType=1)`
  };
});
