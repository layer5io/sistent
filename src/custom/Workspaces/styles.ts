import EditIcon from '@mui/icons-material/Edit';
import { buttonDisabled, styled } from '../../theme';
import { HOVER_DELETE } from '../../theme/colors/colors';

export const ModalActionDiv = styled('div')({
  display: 'flex',
  gap: '1rem'
});

interface ExtendedEditIconProps {
  disabled?: boolean;
  bulk?: boolean;
  style?: React.CSSProperties;
}

export const L5EditIcon = styled(EditIcon)<ExtendedEditIconProps>(
  ({ disabled, bulk, style, theme }) => ({
    color: disabled ? theme.palette.icon.disabled : theme.palette.text.secondary,
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
    },
    ...style
  })
);

export const TableHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center'
});

export const TableRightActionHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem'
});
