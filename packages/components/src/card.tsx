import { CardProps, Card as MuiCard } from '@mui/material';
import React from 'react';

export const Card = (props: CardProps) => {
  return <MuiCard {...props} />;
};
