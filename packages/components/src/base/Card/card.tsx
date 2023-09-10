import { Card as MuiCard, type CardProps } from '@mui/material';
import React from 'react';

export function Card(props: CardProps) {
  return <MuiCard {...props} />;
}
