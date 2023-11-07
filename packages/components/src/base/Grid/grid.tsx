import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

export function Grid(props: MuiGridProps): JSX.Element {
  return <MuiGrid {...props} />;
}
