import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { DialogContentText, Dialog, DialogContent, DialogTitle, Typography } from '@layer5/sistent';
import React from 'react';
import { selectCountdown } from '@/lib/redux/selectors';
import { fetchSessionData } from '@/lib/redux/features/session/session.slice';
import { styled } from '@mui/material';

const SessionExpired = styled(DialogContentText)(() => ({
  minWidth: 400,
  overflowWrap: 'anywhere',
  textAlign: 'center',
  padding: 5,
  margin: 2,
  display: 'flex',
  flexDirection: 'column',
  height: '7rem',
  justifyContent: 'space-evenly',
}));

export default function UnauthenticatedSession() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const countdown = useSelector(selectCountdown);
  const dispatch = useDispatch();

  React.useEffect(() => {
    void dispatch(fetchSessionData());
  }, [dispatch]);

  React.useEffect(() => {
    if (countdown === 0) {
      handleClose();
      router.push('/user/login');
    }
  }, [countdown]);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: 'center',
          minWidth: 400,
          padding: '10px',
          color: '#ebf1f5',
          backgroundColor: '#F0A303',
        }}
      >
        <span></span>
        Session Expired
      </DialogTitle>
      <DialogContent>
        <SessionExpired id="alert-dialog-description">
          <Typography variant="body1">Your session has expired</Typography>
          <Typography>You will be redirected to login in {countdown}</Typography>
        </SessionExpired>
      </DialogContent>
    </Dialog>
  );
}
