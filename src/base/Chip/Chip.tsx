import { Chip as MuiChip, type ChipProps } from '@mui/material';
import React from 'react';

const Chip = React.forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  return <MuiChip {...props} ref={ref} />;
});

export default Chip;
