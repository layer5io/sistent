import { AvatarGroup as MuiAvatarGroup, type AvatarGroupProps } from '@mui/material';
import React from 'react';

export function AvatarGroup(props: AvatarGroupProps): JSX.Element {
  return <MuiAvatarGroup {...props} />;
}
