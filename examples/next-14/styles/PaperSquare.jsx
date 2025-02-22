import { Paper } from '@layer5/sistent';
import { styled } from '@mui/material/styles';

export const PaperSquare = styled(Paper)(() => ({
  flexGrow: 1,
  maxWidth: '100%',
  height: 'auto',
}));
