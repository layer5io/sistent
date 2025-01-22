import {
  ListItemSecondaryAction as MuiListItemSecondaryAction,
  ListItemSecondaryActionProps as MuiListItemSecondaryActionProps
} from '@mui/material';
import React from 'react';

const ListItemSecondaryAction = React.forwardRef<HTMLDivElement, MuiListItemSecondaryActionProps>(
  (props, ref) => {
    return <MuiListItemSecondaryAction {...props} ref={ref} />;
  }
);

export default ListItemSecondaryAction;
