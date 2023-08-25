import { ChipProps, Chip as MuiChip } from '@mui/material';
import React from 'react';

export function Chip(props: ChipProps) {
  return <MuiChip {...props} />;
}
