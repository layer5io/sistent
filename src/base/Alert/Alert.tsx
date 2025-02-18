import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';
import React from 'react';

export const Alert = React.forwardRef<HTMLDivElement, MuiAlertProps>((props, ref) => {
  return <MuiAlert ref={ref} {...props} />;
});

export default Alert;
