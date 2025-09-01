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

export const ButtonContainer = styled('div')(({ theme }) => ({
  padding: '1.25rem 1rem',
  display: 'flex',
  justifyContent: 'flex-end',

  background: theme.palette.surface.tint,
  position: 'relative',
  zIndex: '100'
}));

export const HeaderTypography = styled(Typography)({
  fontSize: '18px'
});
export const HeaderModal = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '5px  5px 0px 0px',
  justifyContent: 'space-between',
  padding: '11px 16px',
  height: '52px',
  fill: WHITE,
  background: theme.palette.surface.tint
}));
