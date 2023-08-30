import { CardContentProps, CardContent as MuiCardContent } from '@mui/material';
import React from 'react';

export const CardContent = (props: CardContentProps) => {
  return <MuiCardContent {...props} />;
};
