import React from 'react';
import { DialogTitle } from '../../base/DialogTitle';
import { Typography } from '../../base/Typography';

interface StyledDialogTitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function StyledDialogTitle({
  children,
  style,
  ...props
}: StyledDialogTitleProps): JSX.Element {
  return (
    <DialogTitle sx={style} {...props}>
      <Typography
        sx={{
          flexGrow: 1,
          fontSize: '1.25rem',
          textAlign: 'center'
        }}
        variant="h6"
      >
        {children}
      </Typography>
    </DialogTitle>
  );
}

export default StyledDialogTitle;
