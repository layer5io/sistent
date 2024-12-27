import { Tabs as MuiTabs, type TabsProps as MuiTabsProps } from '@mui/material';
import React from 'react';

const Tabs = React.forwardRef<HTMLDivElement, MuiTabsProps>((props, ref) => {
  return <MuiTabs {...props} ref={ref} />;
});

export default Tabs;
