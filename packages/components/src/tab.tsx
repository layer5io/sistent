import { Tab as MuiTab, type TabProps } from '@mui/material';
import React from 'react';

export function Tab(props: TabProps): JSX.Element {
  return <MuiTab {...props} />;
}
