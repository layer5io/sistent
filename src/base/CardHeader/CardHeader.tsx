import { CardHeader as MuiCardHeader, CardHeaderProps as MuiCardHeaderProps } from '@mui/material';
import React from 'react';

const CardHeader = React.forwardRef<HTMLDivElement, MuiCardHeaderProps>((props, ref) => {
  return <MuiCardHeader {...props} ref={ref} />;
});

export default CardHeader;
