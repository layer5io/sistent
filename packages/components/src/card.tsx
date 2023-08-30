import React from 'react';
import { Card as MuiCard, CardProps } from '@mui/material';

export const Card = (props: CardProps) => {
  return <MuiCard {...props} />;
};
