import { Badge as MuiBadge, type BadgeProps as MuiBadgeProps } from '@mui/material';
import React from 'react';

const Badge = React.forwardRef<HTMLDivElement, MuiBadgeProps>((props, ref) => {
  return <MuiBadge {...props} ref={ref} />;
});

export default Badge;
