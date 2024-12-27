import {
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps
} from '@mui/material';
import React from 'react';

const ListItemAvatar = React.forwardRef<HTMLDivElement, MuiListItemAvatarProps>((props, ref) => {
  return <MuiListItemAvatar {...props} ref={ref} />;
});

export default ListItemAvatar;
