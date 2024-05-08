import { Collapse as MuiCollapse, CollapseProps as MuiCollapseProps } from '@mui/material';

export function Collapse(props: MuiCollapseProps): JSX.Element {
  return <MuiCollapse {...props} />;
}
