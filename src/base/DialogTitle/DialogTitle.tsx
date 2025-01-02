import {
  DialogTitle as MuiDialogTitle,
  type DialogTitleProps as MuiDialogTitleProps
} from '@mui/material';
import React from 'react';

const DialogTitle = React.forwardRef<HTMLDivElement, MuiDialogTitleProps>((props, ref) => {
  return <MuiDialogTitle {...props} ref={ref} />;
});

export default DialogTitle;
