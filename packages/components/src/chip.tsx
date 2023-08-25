import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export function Chip(props: ChipProps) {
  return <MuiChip {...props} />;
}
