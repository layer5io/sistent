import {
  CardActions as MuiCardActions,
  CardActionsProps as MuiCardActionsProps
} from '@mui/material';
import React from 'react';

const CardActions = React.forwardRef<HTMLDivElement, MuiCardActionsProps>((props, ref) => {
  return <MuiCardActions {...props} ref={ref} />;
});

export default CardActions;
