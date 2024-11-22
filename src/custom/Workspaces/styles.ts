import EditIcon from '@mui/icons-material/Edit';
import { buttonDisabled, styled } from '../../theme';
import { KEPPEL } from '../../theme/colors/colors';

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
      color: disabled ? buttonDisabled : KEPPEL,
      '& svg': {
        color: disabled ? buttonDisabled : KEPPEL
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

export const CellStyle = styled('div')({
  boxSizing: 'border-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

export const CustomBodyRenderStyle = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  boxSizing: 'border-box',
  display: 'block',
  width: '100%'
});
