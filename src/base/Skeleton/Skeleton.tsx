import { Skeleton as MuiSkeleton, type SkeletonProps as MuiSkeletonProps } from '@mui/material';
import React from 'react';

const Skeleton = React.forwardRef<HTMLDivElement, MuiSkeletonProps>((props, ref) => {
  return <MuiSkeleton {...props} ref={ref} />;
});

export default Skeleton;
