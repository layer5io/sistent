import { Tabs as MuiTabs, type TabsProps as MuiTabsProps } from '@mui/material';

export function Tabs(props: MuiTabsProps): JSX.Element {
  return <MuiTabs {...props} />;
}

export default Tabs;
