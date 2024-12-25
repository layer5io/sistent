import { Tab as MuiTab, type TabProps as MuiTypeProps } from '@mui/material';
import React from 'react';

const Tab = React.forwardRef<HTMLDivElement, MuiTypeProps>((props, ref) => {
  return <MuiTab {...props} ref={ref} />;
});

export default Tab;
