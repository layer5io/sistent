import { Dialog, DialogTitle, IconButton, MenuItem } from '@layer5/sistent';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material';

export const MesheryLogo = styled('img')(({ theme }) => ({
  width: theme.spacing(50),
  maxWidth: '100%',
  height: 'auto',
}));

export const MesheryDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const MenuProviderDisabled = styled(MenuItem)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export function MesheryDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
