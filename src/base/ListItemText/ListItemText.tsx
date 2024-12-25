import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material';
import React from 'react';

const ListItemText = React.forwardRef<HTMLDivElement, MuiListItemTextProps>((props, ref) => {
  return <MuiListItemText {...props} ref={ref} />;
});

export { ListItemText };
