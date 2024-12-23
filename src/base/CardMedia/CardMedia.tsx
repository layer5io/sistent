import { CardMedia as MuiCardMedia, CardMediaProps as MuiCardMediaProps } from '@mui/material';
import React from 'react';

const CardMedia = React.forwardRef<HTMLDivElement, MuiCardMediaProps>((props, ref) => {
  return <MuiCardMedia {...props} ref={ref} />;
});

export default CardMedia;
