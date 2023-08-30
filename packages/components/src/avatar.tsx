import { AvatarProps, Avatar as MuiAvatar } from '@mui/material';
import React from 'react';

export function Avatar(props: AvatarProps) {
  return <MuiAvatar {...props} />;
}
