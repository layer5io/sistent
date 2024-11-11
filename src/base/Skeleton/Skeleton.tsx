import { Skeleton as MuiSkeleton, type SkeletonProps as MuiSkeletonProps } from '@mui/material';

export function Skeleton(props: MuiSkeletonProps): JSX.Element {
  return <MuiSkeleton {...props} />;
}

export default Skeleton;
