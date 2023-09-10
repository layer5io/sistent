import { Chip as MuiChip, type ChipProps } from '@mui/material';
import React from 'react';

export function Chip(props: ChipProps) {
  return <MuiChip {...props} />;
}
