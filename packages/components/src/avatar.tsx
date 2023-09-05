import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';
import React from 'react';

export function Avatar(props: AvatarProps): JSX.Element {
  return <MuiAvatar {...props} />;
}
