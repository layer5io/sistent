import { Tab as MuiTab, type TabProps as MuiTypeProps } from '@mui/material';

export function Tab(props: MuiTypeProps): JSX.Element {
  return <MuiTab {...props} />;
}

export default Tab;
