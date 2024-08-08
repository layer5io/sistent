import { styled } from '@mui/material';
import { Box, DialogContentText } from '../../base';

export const Subtitle = styled(DialogContentText)(() => ({
  minWidth: 400,
  overflowWrap: 'anywhere',
  textAlign: 'center',
  padding: '5px'
}));

export const ActionComponent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  gap: '10px'
}));
