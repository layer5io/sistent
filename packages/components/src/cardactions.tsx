import { CardActionsProps, CardActions as MuiCardActions } from '@mui/material';
import React from 'react';

export const CardActions = (props: CardActionsProps) => {
  return <MuiCardActions {...props} />;
};
