import { Avatar as MuiAvatar, type AvatarProps as MuiAvatarProps } from '@mui/material';
import React from 'react';

const Avatar = React.forwardRef<HTMLDivElement, MuiAvatarProps>((props, ref) => {
  return <MuiAvatar {...props} ref={ref} />;
});

export default Avatar;
