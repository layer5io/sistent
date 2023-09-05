import { Card as MuiCard, type CardProps } from '@mui/material';
import React from 'react';

export const Card = (props: CardProps): JSX.Element => {
  return <MuiCard {...props} />;
};
