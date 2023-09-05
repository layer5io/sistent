import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import React from 'react';

export function Badge(props: BadgeProps): JSX.Element {
  return <MuiBadge {...props} />;
}
