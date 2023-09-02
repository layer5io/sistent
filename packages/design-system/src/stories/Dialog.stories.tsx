import {
  BaseButton,
  Dialog,
  DialogTitle,
  List,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton
} from '@layer5/sistent-components';
import React from 'react';
import { AddIconCircleBordered } from '@layer5/sistent-svg';

export default {
  title: 'Example/Dialog',
  component: Dialog,
  tags: ['autodocs']
};

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <Typography key={email}>{email}</Typography>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export function Basic() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <BaseButton variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </BaseButton>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export function Alert() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BaseButton variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </BaseButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BaseButton onClick={handleClose}>Disagree</BaseButton>
          <BaseButton onClick={handleClose} autoFocus>
            Agree
          </BaseButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function Fullscreen() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BaseButton variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </BaseButton>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative', backgroundColor: 'primary.main' }}>
          <Toolbar>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <AddIconCircleBordered />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <BaseButton autoFocus color="inherit" onClick={handleClose}>
              save
            </BaseButton>
          </Toolbar>
        </AppBar>
        <List>
          <Typography>Item 1</Typography>
          <Typography>Item 2</Typography>
        </List>
      </Dialog>
    </div>
  );
}
