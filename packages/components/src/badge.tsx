import { BadgeProps, Badge as MuiBadge } from '@mui/material';
import React from 'react';

export function Badge(props: BadgeProps) {
  return <MuiBadge {...props} />;
}
