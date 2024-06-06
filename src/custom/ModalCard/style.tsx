import { styled } from '@mui/material';
import { Typography } from '../../base';
import { WHITE } from '../../theme/colors/colors';

export const ContentContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.surfaces
}));

export const ModalWrapper = styled('div')(() => ({
  zIndex: '100',
  borderRadius: '5px'
}));

export const ButtonContainer = styled('div')(() => ({
  padding: '1.25rem 1rem',
  display: 'flex',
  justifyContent: 'flex-end',

  background: 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)',
  boxShadow: 'inset 0px 3px 5px 0px rgba(0,0,0,0.25)',
  position: 'relative',
  zIndex: '100'
}));

export const HeaderTypography = styled(Typography)({
  fontSize: '18px'
});
export const HeaderModal = styled('div')(() => ({
  display: 'flex',
  borderRadius: '5px  5px 0px 0px',
  justifyContent: 'space-between',
  padding: '11px 16px',
  height: '52px',
  fill: WHITE,
  boxShadow: 'inset 0px -1px 3px 0px rgba(0,0,0,0.2)',
  background: 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)'
}));
