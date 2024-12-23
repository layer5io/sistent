import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps
} from '@mui/material';
import React from 'react';

const CardContent = React.forwardRef<HTMLDivElement, MuiCardContentProps>((props, ref) => {
  return <MuiCardContent {...props} ref={ref} />;
});

export default CardContent;
