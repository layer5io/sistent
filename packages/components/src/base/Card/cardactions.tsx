import { CardActions as MuiCardActions, type CardActionsProps } from '@mui/material';
import React from 'react';

export function CardActions(props: CardActionsProps) {
  return <MuiCardActions {...props} />;
}
