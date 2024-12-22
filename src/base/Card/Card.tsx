import { Card as MuiCard, type CardProps as MuiCardProps } from '@mui/material';
import React from 'react';

const Card = React.forwardRef<HTMLDivElement, MuiCardProps>((props, ref) => {
  return <MuiCard {...props} ref={ref} />;
});

export default Card;
