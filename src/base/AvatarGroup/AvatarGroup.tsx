import {
  AvatarGroup as MuiAvatarGroup,
  type AvatarGroupProps as MuiAvatarGroupProps
} from '@mui/material';
import React from 'react';

const AvatarGroup = React.forwardRef<HTMLDivElement, MuiAvatarGroupProps>((props, ref) => {
  return <MuiAvatarGroup {...props} ref={ref} />;
});

export default AvatarGroup;
