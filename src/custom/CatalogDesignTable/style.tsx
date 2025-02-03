import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material';
import { buttonDisabled } from '../../theme';
import { HOVER_DELETE } from '../../theme/colors/colors';

export const NameDiv = styled('div')({
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline'
  }
});

interface DeleteIconProps {
  disabled?: boolean;
  bulk?: boolean;
}

export const L5DeleteIcon = styled(DeleteIcon)<DeleteIconProps>(({ disabled, bulk, theme }) => ({
  color: disabled ? theme.palette.icon.disabled : theme.palette.text.default,
  cursor: disabled ? 'not-allowed' : 'pointer',
  width: bulk ? '32' : '28.8',
  height: bulk ? '32' : '28.8',
  '&:hover': {
    color: disabled ? buttonDisabled : HOVER_DELETE,
    '& svg': {
      color: disabled ? buttonDisabled : HOVER_DELETE
    }
  },
  '& svg': {
    color: theme.palette.error.main,
    cursor: disabled ? 'not-allowed' : 'pointer'
  }
}));
